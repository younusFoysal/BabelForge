import Image from 'next/image';
import { z } from 'zod';

import { columns } from '@/components/ui/columns';
import { DataTable } from '@/components/ui/data-table';
import { taskSchema } from '@/data/schema';

const data = [
  {
    id: 'TASK-8782',
    title: "You can't compress the program without quantifying the open-source SSD pixel!",
    status: 'in progress',
    label: 'documentation',
    priority: 'medium',
  },
  {
    id: 'TASK-7878',
    title: 'Try to calculate the EXE feed, maybe it will index the multi-byte pixel!',
    status: 'backlog',
    label: 'documentation',
    priority: 'medium',
  },
  {
    id: 'TASK-7839',
    title: 'We need to bypass the neural TCP card!',
    status: 'todo',
    label: 'bug',
    priority: 'high',
  },
  {
    id: 'TASK-5562',
    title: 'The SAS interface is down, bypass the open-source pixel so we can back up the PNG bandwidth!',
    status: 'backlog',
    label: 'feature',
    priority: 'medium',
  },
  {
    id: 'TASK-8686',
    title: "I'll parse the wireless SSL protocol, that should driver the API panel!",
    status: 'canceled',
    label: 'feature',
    priority: 'medium',
  },
  {
    id: 'TASK-1280',
    title: 'Use the digital TLS panel, then you can transmit the haptic system!',
    status: 'done',
    label: 'bug',
    priority: 'high',
  },
  {
    id: 'TASK-7262',
    title: 'The UTF8 application is down, parse the neural bandwidth so we can back up the PNG firewall!',
    status: 'done',
    label: 'feature',
    priority: 'high',
  },
  {
    id: 'TASK-1138',
    title: "Generating the driver won't do anything, we need to quantify the 1080p SMTP bandwidth!",
    status: 'in progress',
    label: 'feature',
    priority: 'medium',
  },
  {
    id: 'TASK-7184',
    title: 'We need to program the back-end THX pixel!',
    status: 'todo',
    label: 'feature',
    priority: 'low',
  },
  {
    id: 'TASK-5160',
    title: "Calculating the bus won't do anything, we need to navigate the back-end JSON protocol!",
    status: 'in progress',
    label: 'documentation',
    priority: 'high',
  },
  {
    id: 'TASK-5618',
    title: "Generating the driver won't do anything, we need to index the online SSL application!",
    status: 'done',
    label: 'documentation',
    priority: 'medium',
  },
  {
    id: 'TASK-6699',
    title: "I'll transmit the wireless JBOD capacitor, that should hard drive the SSD feed!",
    status: 'backlog',
    label: 'documentation',
    priority: 'medium',
  },
  {
    id: 'TASK-2858',
    title: 'We need to override the online UDP bus!',
    status: 'backlog',
    label: 'bug',
    priority: 'medium',
  },
  {
    id: 'TASK-9864',
    title: "I'll reboot the 1080p FTP panel, that should matrix the HEX hard drive!",
    status: 'done',
    label: 'bug',
    priority: 'high',
  },
  {
    id: 'TASK-8404',
    title: 'We need to generate the virtual HEX alarm!',
    status: 'in progress',
    label: 'bug',
    priority: 'low',
  },
  {
    id: 'TASK-5365',
    title: "Backing up the pixel won't do anything, we need to transmit the primary IB array!",
    status: 'in progress',
    label: 'documentation',
    priority: 'low',
  },
  {
    id: 'TASK-1780',
    title: 'The CSS feed is down, index the bluetooth transmitter so we can compress the CLI protocol!',
    status: 'todo',
    label: 'documentation',
    priority: 'high',
  },
  {
    id: 'TASK-6938',
    title: 'Use the redundant SCSI application, then you can hack the optical alarm!',
    status: 'todo',
    label: 'documentation',
    priority: 'high',
  },
  {
    id: 'TASK-9885',
    title: 'We need to compress the auxiliary VGA driver!',
    status: 'backlog',
    label: 'bug',
    priority: 'high',
  },
  {
    id: 'TASK-3216',
    title: "Transmitting the transmitter won't do anything, we need to compress the virtual HDD sensor!",
    status: 'backlog',
    label: 'documentation',
    priority: 'medium',
  },
  {
    id: 'TASK-9285',
    title: 'The IP monitor is down, copy the haptic alarm so we can generate the HTTP transmitter!',
    status: 'todo',
    label: 'bug',
    priority: 'high',
  },
  {
    id: 'TASK-1024',
    title: "Overriding the microchip won't do anything, we need to transmit the digital OCR transmitter!",
    status: 'in progress',
    label: 'documentation',
    priority: 'low',
  },
  {
    id: 'TASK-7068',
    title: "You can't generate the capacitor without indexing the wireless HEX pixel!",
    status: 'canceled',
    label: 'bug',
    priority: 'low',
  },
  {
    id: 'TASK-6502',
    title: "Navigating the microchip won't do anything, we need to bypass the back-end SQL bus!",
    status: 'todo',
    label: 'bug',
    priority: 'high',
  },
  {
    id: 'TASK-5326',
    title: 'We need to hack the redundant UTF8 transmitter!',
    status: 'todo',
    label: 'bug',
    priority: 'low',
  },
  {
    id: 'TASK-6274',
    title: 'Use the virtual PCI circuit, then you can parse the bluetooth alarm!',
    status: 'canceled',
    label: 'documentation',
    priority: 'low',
  },
  {
    id: 'TASK-1571',
    title: "I'll input the neural DRAM circuit, that should protocol the SMTP interface!",
    status: 'in progress',
    label: 'feature',
    priority: 'medium',
  },
  {
    id: 'TASK-9518',
    title: "Compressing the interface won't do anything, we need to compress the online SDD matrix!",
    status: 'canceled',
    label: 'documentation',
    priority: 'medium',
  },
  {
    id: 'TASK-5581',
    title: "I'll synthesize the digital COM pixel, that should transmitter the UTF8 protocol!",
    status: 'backlog',
    label: 'documentation',
    priority: 'high',
  },
  {
    id: 'TASK-2197',
    title: "Parsing the feed won't do anything, we need to copy the bluetooth DRAM bus!",
    status: 'todo',
    label: 'documentation',
    priority: 'low',
  },
  {
    id: 'TASK-8484',
    title: 'We need to parse the solid state UDP firewall!',
    status: 'in progress',
    label: 'bug',
    priority: 'low',
  },
  {
    id: 'TASK-9892',
    title: 'If we back up the application, we can get to the UDP application through the multi-byte THX capacitor!',
    status: 'done',
    label: 'documentation',
    priority: 'high',
  },
  {
    id: 'TASK-9616',
    title: 'We need to synthesize the cross-platform ASCII pixel!',
    status: 'in progress',
    label: 'feature',
    priority: 'medium',
  },
  {
    id: 'TASK-9744',
    title: 'Use the back-end IP card, then you can input the solid state hard drive!',
    status: 'done',
    label: 'documentation',
    priority: 'low',
  },
  {
    id: 'TASK-1376',
    title: "Generating the alarm won't do anything, we need to generate the mobile IP capacitor!",
    status: 'backlog',
    label: 'documentation',
    priority: 'low',
  },
  {
    id: 'TASK-7382',
    title: 'If we back up the firewall, we can get to the RAM alarm through the primary UTF8 pixel!',
    status: 'todo',
    label: 'feature',
    priority: 'low',
  },
  {
    id: 'TASK-2290',
    title: "I'll compress the virtual JSON panel, that should application the UTF8 bus!",
    status: 'canceled',
    label: 'documentation',
    priority: 'high',
  },
  {
    id: 'TASK-1533',
    title: "You can't input the firewall without overriding the wireless TCP firewall!",
    status: 'done',
    label: 'bug',
    priority: 'high',
  },
  {
    id: 'TASK-4920',
    title: "Bypassing the hard drive won't do anything, we need to input the bluetooth JSON program!",
    status: 'in progress',
    label: 'bug',
    priority: 'high',
  },
  {
    id: 'TASK-5168',
    title: 'If we synthesize the bus, we can get to the IP panel through the virtual TLS array!',
    status: 'in progress',
    label: 'feature',
    priority: 'low',
  },
  {
    id: 'TASK-7103',
    title: 'We need to parse the multi-byte EXE bandwidth!',
    status: 'canceled',
    label: 'feature',
    priority: 'low',
  },
];

// Simulate a database read for tasks.
async function getTasks() {
  const tasks = JSON.parse(data.toString());

  return z.array(taskSchema).parse(tasks);
}

export default async function TaskPage() {
  const tasks = await getTasks();

  return (
    <>
      <div className="md:hidden">
        <Image src="/examples/tasks-light.png" width={1280} height={998} alt="Playground" className="block dark:hidden" />
        <Image src="/examples/tasks-dark.png" width={1280} height={998} alt="Playground" className="hidden dark:block" />
      </div>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">Here&apos;s a list of your tasks for this month!</p>
          </div>
          <div className="flex items-center space-x-2">This is user nav</div>
        </div>
        <DataTable data={tasks} columns={columns} />
      </div>
    </>
  );
}
