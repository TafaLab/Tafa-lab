import { nycRestaurantLeadSeed01 } from "./nyc-restaurant-seed-01";
import { nycRestaurantLeadSeed02 } from "./nyc-restaurant-seed-02";
import { nycRestaurantLeadSeed03 } from "./nyc-restaurant-seed-03";
import { nycRestaurantLeadSeed04 } from "./nyc-restaurant-seed-04";
import { nycRestaurantLeadSeed05 } from "./nyc-restaurant-seed-05";
import { nycRestaurantLeadSeed06 } from "./nyc-restaurant-seed-06";
import { nycRestaurantLeadSeed07 } from "./nyc-restaurant-seed-07";
import { nycRestaurantLeadSeed08 } from "./nyc-restaurant-seed-08";
import { nycRestaurantLeadSeed09 } from "./nyc-restaurant-seed-09";
import { nycRestaurantLeadSeed10 } from "./nyc-restaurant-seed-10";
import { nycRestaurantLeadSeed11 } from "./nyc-restaurant-seed-11";
import { nycRestaurantLeadSeed12 } from "./nyc-restaurant-seed-12";
import { nycRestaurantLeadSeed13 } from "./nyc-restaurant-seed-13";
import { nycRestaurantLeadSeed14 } from "./nyc-restaurant-seed-14";
import { nycRestaurantLeadSeed15 } from "./nyc-restaurant-seed-15";
import { nycRestaurantLeadSeed16 } from "./nyc-restaurant-seed-16";
import { nycRestaurantLeadSeed17 } from "./nyc-restaurant-seed-17";


const normalizeRestaurantName=(value:string)=>value.toLowerCase().replace(/&amp;/g,"&").replace(/[^a-z0-9]+/g," ").trim();
const allNycRestaurantLeadSeed = [...nycRestaurantLeadSeed01,...nycRestaurantLeadSeed02,...nycRestaurantLeadSeed03,...nycRestaurantLeadSeed04,...nycRestaurantLeadSeed05,...nycRestaurantLeadSeed06,...nycRestaurantLeadSeed07,...nycRestaurantLeadSeed08,...nycRestaurantLeadSeed09,...nycRestaurantLeadSeed10,...nycRestaurantLeadSeed11,...nycRestaurantLeadSeed12,...nycRestaurantLeadSeed13,...nycRestaurantLeadSeed14,...nycRestaurantLeadSeed15,...nycRestaurantLeadSeed16,...nycRestaurantLeadSeed17];
// The raw restaurant export used search phrases in the contact column. Those
// are not phone numbers and must never be presented as verified contact data.
type NycRestaurantLead=(typeof allNycRestaurantLeadSeed)[number];
type AuditedNycRestaurantLead=Omit<NycRestaurantLead,"seedProfitability"|"status"> & {seedProfitability:"high"|"medium"|"low";status:"new"|"draft"};
const cleanRestaurantLead=(lead:NycRestaurantLead):AuditedNycRestaurantLead=>{const unverified=/^Телефон:\s*Restaurants\b/i.test(lead.contact);return {...lead,contact:unverified?"Контакт не найден — требуется проверка":lead.contact,message:unverified?"Контакты, адрес и официальный сайт требуют проверки перед обращением.":lead.message,seedProfitability:unverified?"medium":lead.seedProfitability,status:unverified?"draft":"new"}};
export const nycRestaurantLeadSeed = Array.from(new Map(allNycRestaurantLeadSeed.map(cleanRestaurantLead).map(lead=>[normalizeRestaurantName(lead.name),lead])).values());
