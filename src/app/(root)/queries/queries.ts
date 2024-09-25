import { db } from "@/config/globals";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";

export type QueryA = {
  created: string;
  clientname: string;
  agencyname: string;
  productname: string;
};

type QueryB = {
  id: string;
  amount: number;
  created: string;
  completed: string;
  clientname: string;
  agencyname: string;
};

type QueryC = {
  clientname: string;
  agencyname: string;
};

type QueryD = {
  agencyname: string;
  orderamount: number;
};

type QueryE = {
  agencyname: string;
  totalamount: number;
};

type QueryF = {
  clientname: string;
  orderamount: number;
  agencyname: string;
};

type QueryG = {
  totalamount: number;
};

type QueryH = {
  clientName: string;
  totalAmount: number;
};

type QueryI = {
  agencyName: string;
  totalAmount: number;
};

type QueryJ = {
  clientName: string;
  agencyName: string;
  productName: string;
  amount: number;
};

type QueryK = {
  agencyName: string;
  price: number;
};

type QueryL = {
  productName: string;
  agencyPrice: number;
};

type QueryM = {
  agencyName: string;
  totalProducts: number;
};

type QueryN = {
  clientName: string;
  totalOrders: number;
};

type QueryO = {
  agencyName: string;
  productName: string;
  price: number;
};

type QueryP = {
  agencyName: string;
  productName: string;
  orderAmount: number;
};

type QueryQ = {
  agencyName: string;
  productName: string;
  orderAmount: number;
};

type QueryR = {
  totalAmount: number;
};

type QueryS = {
  agencyName: string;
  totalOrders: number;
};

type QueryT = {
  clientName: string;
  agencyName: string;
  orderAmount: number;
};

type QueryU = {
  clientName: string;
  agencyName: string;
  orderAmount: number;
};

const cookieStore = cookies();
const authToken = cookieStore.get("auth-token");
const prisma = new PrismaClient({
  datasourceUrl: authToken?.value,
});

// Симметричное внутреннее соединение с условием отбора по датам
export const queryA = async () => {
  const data = await prisma.$queryRaw<QueryA[]>`
  SELECT o.created AS created, c.name AS clientName, a.name AS agencyName, p.name AS productName
  FROM orders o
  INNER JOIN clients c ON o.client_id = c.id
  INNER JOIN agencies a ON o.agency_id = a.id
  INNER JOIN agency_poducts ap ON o.agency_product_id = ap.id
  INNER JOIN products p ON ap.product_id = p.id
  WHERE o.created BETWEEN '1970-01-01' AND '1970-01-01';
  `;

  // console.log(data);
  return data;
};

// Симметричное внутреннее соединение с условием отбора по датам
const queryB = async () => {
  const data = await prisma.$queryRaw<QueryB[]>`
  SELECT o.id, o.amount, o.created, o.completed, c.name AS clientName, a.name AS agencyName
    FROM orders o
    INNER JOIN clients c ON o.client_id = c.id
    INNER JOIN agencies a ON o.agency_id = a.id
    WHERE o.completed BETWEEN '1960-01-01' AND '2023-12-31';`;

  // console.log(data);
  return data;
};

// Симметричное внутреннее соединение без условия
const queryC = async () => {
  const data = await prisma.$queryRaw<QueryC[]>`
  SELECT clients.name AS clientName, agencies.name AS agencyName 
    FROM clients 
    INNER JOIN orders ON clients.id = orders.client_id 
    INNER JOIN agencies ON orders.agency_id = agencies.id;`;

  // console.log(data);
  return data;
};

// Итоговый запрос с условием на группы
const queryD = async () => {
  const data = await prisma.$queryRaw<
    QueryD[]
  >`SELECT a.name AS agencyName, SUM(o.amount)::int AS orderAmount 
    FROM orders o 
    INNER JOIN agencies a ON o.agency_id = a.id 
    GROUP BY a.name HAVING SUM(o.amount)::int > 1000;`;

  //console.log(data);
  return data;
};

// Итоговый запрос без условия
const queryE = async () => {
  const data = await prisma.$queryRaw<QueryE[]>`
  SELECT a.name AS agencyName, SUM(o.amount)::int AS totalAmount 
  FROM orders o 
  INNER JOIN agencies a ON o.agency_id = a.id 
  GROUP BY a.name;`;

  //console.log(data);
  return data;
};

// Симметричное внутреннее соединение без условия
const queryF = async () => {
  const data = await prisma.$queryRaw<QueryF[]>`
  SELECT c.name AS clientName, o.amount AS orderAmount, a.name AS agencyName 
  FROM clients c 
  INNER JOIN orders o ON c.id = o.client_id 
  INNER JOIN agencies a ON o.agency_id = a.id;
  `;

  //console.log(data);
  return data;
};

// Итоговый запрос без условия с итоговыми данными вида «всего»
const queryG = async () => {
  const data = await prisma.$queryRaw<QueryG[]>`
  SELECT SUM(o.amount)::int AS totalAmount FROM orders o;
  `;

  // console.log(data);
  return data;
};

// Итоговый запрос без условия с итоговыми данными вида «в том числе»
const queryH = async () => {
  const data = await prisma.$queryRaw<QueryH[]>`
  SELECT c.name AS clientName, SUM(o.amount)::int AS totalAmount
  FROM orders o 
  JOIN clients c ON o.client_id = c.id 
  GROUP BY c.name;
  `;

  // console.log(data);
  return data;
};

// Итоговый запрос с условием на данные по значению
const queryI = async () => {
  const data = await prisma.$queryRaw<QueryI[]>`
  SELECT a.name AS agencyName, SUM(o.amount)::int AS totalAmount
  FROM orders o
  JOIN agencies a ON o.agency_id = a.id
  WHERE a.name = 'Вектор Рекламы'
  GROUP BY a.name;
  `;

  // console.log(data);
  return data;
};

// Cимметричное внутреннее соединение с условием отбора по внешнему ключу
const queryJ = async () => {
  const data = await prisma.$queryRaw<QueryJ[]>`
  SELECT c.name AS clientName, a.name AS agencyName, p.name AS productName, o.amount AS amount
  FROM orders o
  INNER JOIN clients c ON o.client_id = c.id
  INNER JOIN agencies a ON o.agency_id = a.id
  INNER JOIN agency_poducts ap ON o.agency_product_id = ap.id
  INNER JOIN products p ON ap.product_id = p.id
  WHERE a.id = '7299d30e-2f61-45af-bfec-3b9677958ba3';
  `;

  // console.log(data);
  return data;
};

// Левое внешнее соединение
const queryK = async () => {
  const data = await prisma.$queryRaw<QueryK[]>`
    SELECT a.name as agencyName, ap.price AS price
    FROM agencies a
    LEFT JOIN agency_poducts ap ON a.id = ap.agency_id;
    `;

  // console.log(data);
  return data;
};

// Правое внешнее соединение
const queryL = async () => {
  const data = await prisma.$queryRaw<QueryL[]>`
  SELECT p.name AS productName, ap.price AS agencyPrice 
  FROM products p 
  RIGHT JOIN agency_poducts ap ON p.id = ap.product_id;
  `;

  // console.log(data);
  return data;
};

// Итоговые запросы с условием на данные с использованием индекса
const queryM = async () => {
  const data = await prisma.$queryRaw<QueryM[]>`
  SELECT a.name AS agencyName, COUNT(ap.product_id)::int AS totalProducts
  FROM agencies a
  LEFT JOIN agency_poducts ap ON a.id = ap.agency_id
  WHERE ap.price > 50
  GROUP BY a.name;
  `;

  // console.log(data);
  return data;
};

// Итоговые запросы с условием на данные по маске
const queryN = async () => {
  const data = await prisma.$queryRaw<QueryN[]>`
    SELECT c.name AS clientName, COUNT(o.id)::int AS totalOrders
    FROM clients c
    LEFT JOIN orders o ON c.id = o.client_id
    WHERE c.name LIKE 'О%'
    GROUP BY c.name;
    `;

  // console.log(data);
  return data;
};

// Запрос на запросе по принципу левого соединения
const queryO = async () => {
  const data = await prisma.$queryRaw<QueryO[]>`
  SELECT a.name AS agencyName, p.name AS productName, ap.price AS price 
  FROM agencies a
  LEFT JOIN agency_poducts ap ON a.id = ap.agency_id
  LEFT JOIN products p ON ap.product_id = p.id
  WHERE ap.price > 100
  ORDER BY ap.price;
  `;

  // console.log(data);
  return data;
};

// Симметричное внутреннее соединение с условием отбора по внешнему ключу
const queryP = async () => {
  const data = await prisma.$queryRaw<QueryP[]>`
  SELECT 
    a.name AS agencyName, 
    p.name AS productName, 
    o.amount AS orderAmount 
  FROM agencies a
  INNER JOIN agency_poducts ap ON a.id = ap.agency_id
  INNER JOIN products p ON ap.product_id = p.id
  INNER JOIN orders o ON ap.id = o.agency_product_id
  WHERE a.city_id = '2920a37f-cc45-4285-9e8a-2c89a831a800';
  `;

  // console.log(data);
  return data;
};

// Симметричное внутреннее соединение без условия
const queryQ = async () => {
  const data = await prisma.$queryRaw<QueryQ[]>`
  SELECT 
    a.name AS agency_name, 
    p.name AS product_name, 
    o.amount AS order_amount 
  FROM agencies a
  INNER JOIN agency_poducts ap ON a.id = ap.agency_id
  INNER JOIN products p ON ap.product_id = p.id
  INNER JOIN orders o ON ap.id = o.agency_product_id;
  `;

  // console.log(data);
  return data;
};

// Итоговые запросы с условием на данные без использования индекса
const queryR = async () => {
  const data = await prisma.$queryRaw<QueryR[]>`
  SELECT SUM(o.amount)::int AS totalAmount 
  FROM orders o
  WHERE o.created <= '1970-01-01' 
  AND o.completed IS NOT NULL;
  `;

  //console.log(data);
  return data;
};

// Итоговый запрос с условием на данные и на группы
const queryS = async () => {
  const data = await prisma.$queryRaw<QueryS[]>`
  SELECT agency.name AS agencyName, COUNT(o.id)::int AS totalOrders
  FROM orders AS o
  JOIN agencies AS agency ON o.agency_id = agency.id
  WHERE o.created >= '1970-01-01'
  GROUP BY agency.name;
  `;

  // console.log(data);
  return data;
};

// Запрос с использованием объединения
const queryT = async () => {
  const data = await prisma.$queryRaw<QueryT[]>`
  SELECT client.name AS clientName, o.amount AS orderAmount, agency.name AS agencyName 
  FROM clients AS client
  JOIN orders AS o ON client.id = o.client_id
  JOIN agencies AS agency ON o.agency_id = agency.id;
  `;

  // console.log(data);
  return data;
};

// Запросы с подзапросами с использованием in
const queryU = async () => {
  const data = await prisma.$queryRaw<QueryU[]>`
    SELECT c.name AS clientName, a.name AS agencyName, o.amount AS orderAmount 
  FROM orders o
  INNER JOIN clients c ON o.client_id = c.id
  INNER JOIN agencies a ON o.agency_id = a.id
  WHERE a.city_id IN (SELECT id FROM cities WHERE name = 'Пинск');
  `;

  // console.log(data);
  return data;
};