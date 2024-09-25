import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { db } from "@/config/globals";
import { PrismaClient } from "@prisma/client";
import { queryA, QueryA } from "./queries";

/* 
// @ts-ignore */

export default async function QueriesPage() {
  

    
  const ordersA = await queryA();
  console.log(ordersA);
  

  // const ordersB = queryB();

  

  // const agenciesClientsC = queryC();

  

  // const agenciesD = queryD();

  

  // const agenciesE = queryE();

  

  // const clientsF = queryF();

  

  // const orderAmountG = queryG();

  

  // const clientsH = queryH();

  

  // const agenciesI = queryI();

  

  // const clientsAgenciesJ = queryJ();

  

  // const agenciesK = queryK();

  

  // const productsL = queryL();

  

  // const agenciesM = queryM();



  // const clientsN = queryN();

  

  // const agenciesO = queryO();

  

  // const agenciesP = queryP();

  

  // const agenciesQ = queryQ();

  

  // const ordersR = queryR();

  

  // const agenciesS = queryS();

  

  // const clientsT = queryT();

  

  // const agenciesU = queryU();

  return (
    <div className="flex min-h-screen flex-col items-center">
      <div className="w-90 space-y-14">
        <div>
          <h1 className="text-3xl font-bold m-14 text-center">
            Симметричное внутреннее соединение с условием отбора по датам
          </h1>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Создан</TableHead>
                <TableHead>Клиент</TableHead>
                <TableHead>Агенство</TableHead>
                <TableHead className="text-right">Продукт</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* <TableRow>
                <TableCell className="font-medium">INV001</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell className="text-right">$250.00</TableCell>
              </TableRow> */}
              {ordersA.map((order: QueryA) => (<TableRow>
                <TableCell className="font-medium">{order.agencyname}</TableCell>
                <TableCell>{order.clientname}</TableCell>
                <TableCell>{order.productname}</TableCell>
                <TableCell className="text-right">{String(order.created)}</TableCell>
              </TableRow>))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
