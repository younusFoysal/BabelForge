import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { AvatarImage } from "@radix-ui/react-avatar"
import Image from 'next/image'
import { Avatar, AvatarFallback } from "@stream-io/video-react-sdk"

export function TabsTransaction({teams, transactions}) {
  return (
    <Tabs defaultValue="teams" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="teams">Teams</TabsTrigger>
        <TabsTrigger value="transactions">Transaction</TabsTrigger>
      </TabsList>
      <TabsContent value="teams">
        <Card>
          <CardHeader>
            <CardTitle>Your Teams</CardTitle>
            <CardDescription>
                You have total {teams?.length} teams
            </CardDescription>
          </CardHeader>
          <div className="grid grid-cols-2">
            {
                teams.map(team=><div key={team} className="flex  items-center gap-4  ">
                    <p className="flex p-5  items-center gap-2 hover:bg-gray-200 w-full rounded-md dark:hover:bg-gray-900">
                      <span className=" rounded-full p-1">
                        <div className="w-10 h-10 rounded-full">
                            <Image className="h-10 w-10 object-cover rounded-full" src={team?.tpic} alt="" width={50} height={50} />
                        </div>
                      </span>
                   <span className="flex flex-col">
                   <span className="font-bold text-xl"> {team?.tname}</span>
                   <small>{team.tcategory}</small>
                   </span>
                    </p>
                  </div>)
            }
          </div>
        </Card>
      </TabsContent>
      <TabsContent value="transactions">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
