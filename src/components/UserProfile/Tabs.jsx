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
import Image from 'next/image'
import UserTransaction from "./UserTransaction"

export function TabsTransaction({teams, transactions}) {
  return (
    <Tabs defaultValue="teams" className="w-full">
      <TabsList className="grid dark:bg-[#181024] w-full grid-cols-2">
        <TabsTrigger value="teams">Teams</TabsTrigger>
        <TabsTrigger value="transactions">Transaction</TabsTrigger>
      </TabsList>
      <TabsContent value="teams">
        <Card className="dark:bg-[#181024] border dark:hover: dark:border-[#3e1878c2]">
          <CardHeader>
            <CardTitle>Your Teams</CardTitle>
            <CardDescription>
                You have total {teams?.length} teams
            </CardDescription>
          </CardHeader>
          <div className="grid grid-cols-2 dark:bg-[#181024]">
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
        <Card className='dark:bg-[#181024]'>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>
                You have total {transactions?.length} transactions
            </CardDescription>
          </CardHeader>
         
         <UserTransaction transactions={transactions} />
          
        </Card>
      </TabsContent>
    </Tabs>
  )
}
