import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AgencyProduct } from "@/models/agency-product";
import DeleteDialog from "../delete-dialog";
import AddAgencyProductDialog from "@/components/tables/add/add-agency-product-dialog";
import EditAgencyProductDialog from "@/components/tables/edit/edit-agency-product-dialog";

type Props = {
  agencyProducts: AgencyProduct[] | undefined;
  total: number | undefined;
};

export default function AgencyProductsTable({ agencyProducts, total }: Props) {
  return (
    <>
      {!agencyProducts ? (
        <div className="m-40">
          <p className="text-center">Загрузка...</p>
        </div>
      ) : (
        <Table>
          <TableCaption>Всего записей: {total}. <AddAgencyProductDialog/> 
          </TableCaption>
          <TableHeader>
            <TableHead className="w-[350px]">ИД</TableHead>
            <TableHead>Агенство</TableHead>
            <TableHead>Продукт</TableHead>
            <TableHead>Цена за ед.</TableHead>
            <TableHead>Действия</TableHead>
          </TableHeader>
          <TableBody>
            {agencyProducts.map((agencyProduct: AgencyProduct) => (
              <TableRow key={agencyProduct.id}>
                <TableCell className="text-sm">{agencyProduct.id}</TableCell>
                <TableCell>{agencyProduct.agency.name}</TableCell>
                <TableCell>{agencyProduct.product.name}</TableCell>
                <TableCell>{agencyProduct.price}</TableCell>
                <TableCell>
                  <EditAgencyProductDialog id={agencyProduct.id} agencyProduct={agencyProduct} />
                  <DeleteDialog id={agencyProduct.id} table="agency-products" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
}
