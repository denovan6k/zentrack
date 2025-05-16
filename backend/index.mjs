import express from 'express';
import { ethers } from 'ethers';
import dotenv from 'dotenv';
import cors from 'cors';
import { adminDb } from './lib/adminConfig.js';
import DonationContractABI from './abis/DonationContractABI.json' with { type: "json" };

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3001;
const contractAddress = process.env.DONATION_CONTRACT_ADDRESS;
const privateKey = process.env.PRIVATE_KEY?.trim();
const rpcUrl = process.env.RPC_URL;

const provider = new ethers.JsonRpcProvider(rpcUrl);
const signer = new ethers.Wallet(privateKey, provider);
const donationContract = new ethers.Contract(contractAddress, DonationContractABI, signer);

// Middleware for admin verification
const isAdmin = async (req, res, next) => {
  const { address } = req.body;
  try {
    const contractAdmin = await donationContract.admin();
    if (address !== contractAdmin) {
      return res.status(403).json({ error: "Unauthorized access" });
    }
    next();
  } catch (error) {
    res.status(500).json({ error: "Error verifying admin status" });
  }
};

// Donor endpoints
app.post('/api/donor/register', async (req, res) => {
  const { address, name } = req.body;
  try {
    const tx = await donationContract.connect(signer).registerDonor(name);
    await tx.wait();
    await adminDb.collection('donors').doc(address).set({ name, createdAt: new Date() });
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
});

app.post('/api/donate', async (req, res) => {
  const { donorAddress, charityAddress, amount } = req.body;
  try {
    const tx = await donationContract.connect(signer).makeDonation(charityAddress, { value: amount });
    await tx.wait();
    res.status(200).json({ success: true, txHash: tx.hash });
  } catch (error) {
    res.status(500).json({ error: "Donation failed" });
  }
});

// Charity endpoints
app.post('/api/charity/register', isAdmin, async (req, res) => {
  const { name, description, wallet } = req.body;
  try {
    const tx = await donationContract.connect(signer).registerCharity(name, description, wallet);
    await tx.wait();
    await adminDb.collection('charities').doc(wallet).set({ name, description, wallet });
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Charity registration failed" });
  }
});

// Admin endpoints
app.get('/api/admin/donors', isAdmin, async (req, res) => {
  try {
    // Get on-chain data
    const donorsSnapshot = await adminDb.collection('donors').get();
    const donors = donorsSnapshot.docs.map(doc => doc.data());
    
    res.status(200).json(donors);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch donors" });
  }
});

app.get('/api/admin/charities', isAdmin, async (req, res) => {
  try {
    const charitiesSnapshot = await adminDb.collection('charities').get();
    const charities = charitiesSnapshot.docs.map(doc => doc.data());
    res.status(200).json(charities);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch charities" });
  }
});

// Receiver endpoints
app.post('/api/receiver/donations', async (req, res) => {
  const { address } = req.body;
  try {
    const donationsSnapshot = await adminDb.collection('donations')
      .where('charityAddress', '==', address)
      .orderBy('timestamp', 'desc')
      .get();
    
    const donations = donationsSnapshot.docs.map(doc => doc.data());
    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch donations" });
  }
});

app.post('/api/receiver/withdraw', async (req, res) => {
  const { address, amount } = req.body;
  try {
    // Verify the receiver is a registered charity
    const charity = await donationContract.charities(address);
    if (!charity.verified) {
      return res.status(403).json({ error: "Not a verified charity" });
    }

    // In a real implementation, you might want to implement withdrawal logic here
    // For now, we'll just log it
    console.log(`Withdrawal request: ${amount} ETH to ${address}`);
    
    res.status(200).json({ success: true, message: "Withdrawal processed" });
  } catch (error) {
    res.status(500).json({ error: "Withdrawal failed" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});