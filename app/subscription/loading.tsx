import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <div>
        <Skeleton className="h-10 w-[250px]" />
        <Skeleton className="h-4 w-[300px] mt-2" />
      </div>

      {/* Current Subscription Card Skeleton */}
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-[200px]" />
          <Skeleton className="h-4 w-[250px] mt-2" />
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div>
                  <Skeleton className="h-5 w-[100px]" />
                  <Skeleton className="h-4 w-[80px] mt-1" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <Skeleton className="h-4 w-[60px]" />
                <Skeleton className="h-5 w-[80px] mt-1" />
              </div>
              <div>
                <Skeleton className="h-4 w-[60px]" />
                <Skeleton className="h-5 w-[100px] mt-1" />
              </div>
              <div>
                <Skeleton className="h-4 w-[60px]" />
                <Skeleton className="h-5 w-[100px] mt-1" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Billing Cycle Tabs Skeleton */}
      <div className="flex justify-center">
        <Skeleton className="h-10 w-[300px]" />
      </div>

      {/* Subscription Plans Skeleton */}
      <div className="grid gap-6 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-6 w-[100px]" />
              </div>
              <Skeleton className="h-4 w-full mt-2" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-8 w-[100px]" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-[80px]" />
                <div className="space-y-2">
                  {[1, 2, 3, 4].map((j) => (
                    <div key={j} className="flex items-start">
                      <Skeleton className="h-5 w-5 mr-2 rounded-full" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Skeleton className="h-10 w-full" />
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Enterprise Contact Card Skeleton */}
      <Card>
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <Skeleton className="h-16 w-16 rounded-full" />
            <div className="flex-1 space-y-4">
              <Skeleton className="h-6 w-[200px]" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-10 w-[150px]" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
