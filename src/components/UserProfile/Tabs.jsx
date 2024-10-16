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
            <CardTitle>Total: {teams?.length} Teams</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you're done.
            </CardDescription>
          </CardHeader>
          <div>
            {
                teams.map(team=><div key={team} className="flex  items-center gap-4  ">
                    <p className="flex  items-center gap-2 hover:bg-gray-200 w-full p-1 rounded-md dark:hover:bg-gray-900">
                      <span className=" rounded-full p-1">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src="https://i.ibb.co.com/zrCsVD7/github.jpg" />
                          <AvatarFallback>TA</AvatarFallback>
                        </Avatar>
                      </span>
                      Tofayel Ahmed
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
