export const inr = (n: number) => "Rs " + n.toLocaleString("en-IN");

export const COMPANY = {
  name: "Malabar Estates Pvt. Ltd.",
  gstin: "32AABCM4821K1Z7",
  address: "4th Floor, Pioneer Towers, Marine Drive, Ernakulam, Kochi 682031",
  pan: "AABCM4821K",
};

export type Property = {
  id: string;
  name: string;
  address: string;
  type: "Commercial" | "Auditorium";
  units: number;
  occupied: number;
};

export const properties: Property[] = [
  { id: "p1", name: "Pioneer Towers", address: "Marine Drive, Ernakulam, Kochi", type: "Commercial", units: 8, occupied: 7 },
  { id: "p2", name: "Lulu Arcade Annex", address: "Edappally, Kochi 682024", type: "Commercial", units: 6, occupied: 6 },
  { id: "p3", name: "Periyar Business Centre", address: "Aluva Bypass, Aluva 683101", type: "Commercial", units: 5, occupied: 3 },
  { id: "p4", name: "Kaloor Trade Plaza", address: "Kaloor Junction, Kochi 682017", type: "Commercial", units: 4, occupied: 4 },
  { id: "p5", name: "Vyttila Commerce Hub", address: "NH 66, Vyttila, Kochi 682019", type: "Commercial", units: 6, occupied: 5 },
  { id: "p6", name: "Sree Rama Convention Hall", address: "MG Road, Thrissur 680001", type: "Auditorium", units: 1, occupied: 1 },
];

export type Payment = { date: string; amount: number; mode: string; ref: string; status: "Paid" | "Overdue" | "Pending" };

export type Unit = {
  id: string;
  propertyId: string;
  code: string;
  area: number;
  tenant: string;
  contact: string;
  phone: string;
  gstin: string;
  start: string;
  end: string;
  rent: number;
  deposit: number;
  status: "Active" | "Expiring soon" | "Ended";
  payments: Payment[];
};

const hist = (rent: number, overdue = false): Payment[] =>
  ["01 Oct 2026", "01 Sep 2026", "01 Aug 2026", "01 Jul 2026", "01 Jun 2026", "01 May 2026"].map((d, i) => ({
    date: d,
    amount: rent,
    mode: ["NEFT", "UPI", "Cheque", "NEFT", "RTGS", "NEFT"][i] ?? "NEFT",
    ref: `INV/26-27/${String(412 - i * 23).padStart(4, "0")}`,
    status: i === 0 && overdue ? "Overdue" : "Paid",
  }));

export const units: Unit[] = [
  { id: "u101", propertyId: "p1", code: "PT-101", area: 1450, tenant: "Kerala Spice Traders LLP", contact: "Anil Kumar Menon", phone: "+91 98470 23145", gstin: "32AAKFK7712L1Z3", start: "01 Apr 2023", end: "31 Mar 2027", rent: 62000, deposit: 372000, status: "Active", payments: hist(62000) },
  { id: "u102", propertyId: "p1", code: "PT-102", area: 980, tenant: "Nair & Associates, CA", contact: "Lakshmi Nair", phone: "+91 94460 81120", gstin: "32AAJFN3390M1Z9", start: "15 Jan 2022", end: "14 Dec 2026", rent: 38500, deposit: 231000, status: "Expiring soon", payments: hist(38500) },
  { id: "u103", propertyId: "p1", code: "PT-201", area: 2100, tenant: "Backwater Tech Solutions", contact: "Rahul Varghese", phone: "+91 97450 66231", gstin: "32AAECB5521Q1Z1", start: "01 Jul 2024", end: "30 Jun 2029", rent: 78000, deposit: 468000, status: "Active", payments: hist(78000, true) },
  { id: "u104", propertyId: "p2", code: "LA-G04", area: 640, tenant: "Kalyan Silks Boutique", contact: "Meera Pillai", phone: "+91 98950 11873", gstin: "32AADCK9012R1Z6", start: "01 Nov 2021", end: "30 Nov 2026", rent: 54000, deposit: 324000, status: "Expiring soon", payments: hist(54000) },
  { id: "u105", propertyId: "p2", code: "LA-F12", area: 520, tenant: "Chai Kada Café", contact: "Joseph Thomas", phone: "+91 90370 44512", gstin: "32ABMPT6623K1Z2", start: "01 Feb 2025", end: "31 Jan 2028", rent: 28000, deposit: 168000, status: "Active", payments: hist(28000, true) },
  { id: "u106", propertyId: "p3", code: "PB-03", area: 860, tenant: "Mathew Pharma Distributors", contact: "Biju Mathew", phone: "+91 94477 30981", gstin: "32AAHFM2245D1Z8", start: "01 Jun 2024", end: "31 May 2027", rent: 31500, deposit: 189000, status: "Active", payments: hist(31500) },
  { id: "u107", propertyId: "p4", code: "KT-02", area: 410, tenant: "Sreedhar Opticals", contact: "Sreedhar K.", phone: "+91 98461 77234", gstin: "32ACQPS4410H1Z4", start: "01 Sep 2020", end: "31 Aug 2026", rent: 18500, deposit: 111000, status: "Ended", payments: hist(18500) },
  { id: "u108", propertyId: "p5", code: "VC-105", area: 1200, tenant: "Indus Motors Service Point", contact: "Faisal Rahman", phone: "+91 97440 55018", gstin: "32AAFCI8834B1Z0", start: "01 Mar 2025", end: "28 Feb 2030", rent: 46000, deposit: 276000, status: "Active", payments: hist(46000) },
  { id: "u109", propertyId: "p3", code: "PB-01", area: 700, tenant: "Green Leaf Ayurveda Clinic", contact: "Dr. Anjali Krishnan", phone: "+91 90610 22987", gstin: "32ABCFG1209E1Z5", start: "10 Jan 2024", end: "09 Dec 2026", rent: 24000, deposit: 144000, status: "Expiring soon", payments: hist(24000) },
  { id: "u110", propertyId: "p4", code: "KT-04", area: 900, tenant: "Federal Insurance Brokers", contact: "Suresh Babu", phone: "+91 94950 63310", gstin: "32AAGCF7741P1Z2", start: "01 Aug 2023", end: "31 Jul 2028", rent: 35000, deposit: 210000, status: "Active", payments: hist(35000) },
];

export const monthlyRent = [
  { month: "May", collected: 1240000, expected: 1310000 },
  { month: "Jun", collected: 1285000, expected: 1310000 },
  { month: "Jul", collected: 1302000, expected: 1342000 },
  { month: "Aug", collected: 1338000, expected: 1342000 },
  { month: "Sep", collected: 1296000, expected: 1385000 },
  { month: "Oct", collected: 1361000, expected: 1415500 },
];

export const activity = [
  { type: "lease", text: "New lease signed with Indus Motors Service Point — VC-105", time: "2 hours ago" },
  { type: "payment", text: "Payment of Rs 62,000 received from Kerala Spice Traders LLP", time: "4 hours ago" },
  { type: "quote", text: "Quotation QT-0187 sent to Thomas & Annamma wedding party", time: "Yesterday, 5:40 PM" },
  { type: "booking", text: "Booking confirmed: Federal Bank Annual Meet, 14 Nov", time: "Yesterday, 11:15 AM" },
  { type: "payment", text: "Deposit of Rs 40,000 received for Onam Cultural Fest", time: "26 Oct, 3:20 PM" },
  { type: "quote", text: "Quotation QT-0186 accepted by Kochi Rotary Club", time: "25 Oct, 10:05 AM" },
];

export const upcoming = [
  { kind: "Event", title: "Federal Bank Annual Meet", date: "Thu, 29 Oct", detail: "Full day · 450 guests" },
  { kind: "Renewal", title: "Kalyan Silks Boutique — LA-G04", date: "Fri, 30 Oct", detail: "Lease ends 30 Nov" },
  { kind: "Event", title: "Thomas–Annamma Wedding Reception", date: "Sat, 31 Oct", detail: "6 PM – 11 PM · 800 guests" },
  { kind: "Event", title: "KSUM Startup Demo Day", date: "Sun, 1 Nov", detail: "9 AM – 2 PM · 300 guests" },
  { kind: "Renewal", title: "Nair & Associates — PT-102", date: "Mon, 2 Nov", detail: "Renewal meeting · 11 AM" },
];

export type Booking = {
  id: string;
  day: number; // November 2026
  client: string;
  event: string;
  start: number;
  end: number;
  amount: number;
  deposit: number;
  status: "Confirmed" | "Tentative" | "Pending deposit";
};

export const bookings: Booking[] = [
  { id: "b1", day: 1, client: "Kerala Startup Mission", event: "Demo Day", start: 9, end: 14, amount: 65000, deposit: 20000, status: "Confirmed" },
  { id: "b2", day: 4, client: "Rajagiri College Alumni", event: "Alumni Meet", start: 16, end: 21, amount: 48000, deposit: 15000, status: "Confirmed" },
  { id: "b3", day: 7, client: "Joseph & Riya", event: "Engagement", start: 11, end: 15, amount: 55000, deposit: 25000, status: "Confirmed" },
  { id: "b4", day: 7, client: "Thrissur Music Circle", event: "Carnatic Concert", start: 14, end: 19, amount: 42000, deposit: 0, status: "Tentative" },
  { id: "b5", day: 11, client: "Federal Bank", event: "Annual Meet", start: 9, end: 18, amount: 125000, deposit: 50000, status: "Confirmed" },
  { id: "b6", day: 14, client: "Kochi Rotary Club", event: "Charity Gala", start: 18, end: 23, amount: 95000, deposit: 40000, status: "Confirmed" },
  { id: "b7", day: 15, client: "Arjun & Divya", event: "Wedding Reception", start: 17, end: 23, amount: 150000, deposit: 60000, status: "Confirmed" },
  { id: "b8", day: 19, client: "IMA Thrissur", event: "Medical Conference", start: 8, end: 17, amount: 110000, deposit: 0, status: "Pending deposit" },
  { id: "b9", day: 21, client: "St. Thomas School", event: "Annual Day", start: 15, end: 21, amount: 38000, deposit: 12000, status: "Confirmed" },
  { id: "b10", day: 22, client: "Haris & Sana", event: "Nikah Ceremony", start: 10, end: 16, amount: 85000, deposit: 30000, status: "Confirmed" },
  { id: "b11", day: 22, client: "Lions Club Kochi", event: "Installation Night", start: 15, end: 20, amount: 52000, deposit: 0, status: "Tentative" },
  { id: "b12", day: 27, client: "Kerala Kalamandalam", event: "Kathakali Performance", start: 17, end: 21, amount: 30000, deposit: 10000, status: "Confirmed" },
  { id: "b13", day: 29, client: "Manappuram Finance", event: "Dealer Meet", start: 10, end: 17, amount: 98000, deposit: 35000, status: "Pending deposit" },
];

export type Stage = "New Lead" | "Quotation Sent" | "Negotiating" | "Won" | "Lost";
export const stages: Stage[] = ["New Lead", "Quotation Sent", "Negotiating", "Won", "Lost"];

export type Lead = {
  id: string;
  name: string;
  org: string;
  phone: string;
  email: string;
  interest: string;
  value: number;
  stage: Stage;
  source: string;
  items: { desc: string; sac: string; qty: number; rate: number }[];
};

export const leads: Lead[] = [
  { id: "L-231", name: "Vishnu Prasad", org: "Prasad Jewellers", phone: "+91 98472 11903", email: "vishnu@prasadjewel.in", interest: "Commercial unit, 1200 sq ft", value: 58000, stage: "New Lead", source: "Website", items: [{ desc: "Monthly rent — PB-04 (1200 sq ft)", sac: "997212", qty: 1, rate: 52000 }, { desc: "Maintenance charges", sac: "995419", qty: 1, rate: 6000 }] },
  { id: "L-232", name: "Fathima Beevi", org: "Beevi Textiles", phone: "+91 90483 55120", email: "fathima@beevitex.com", interest: "Retail space, ground floor", value: 42000, stage: "New Lead", source: "Walk-in", items: [{ desc: "Monthly rent — VC-108", sac: "997212", qty: 1, rate: 38000 }, { desc: "Maintenance charges", sac: "995419", qty: 1, rate: 4000 }] },
  { id: "L-228", name: "Thomas Kurian", org: "Thomas–Annamma Wedding", phone: "+91 94471 08832", email: "thomas.kurian@gmail.com", interest: "Auditorium · 31 Oct", value: 135000, stage: "Quotation Sent", source: "Referral", items: [{ desc: "Auditorium hire — full evening", sac: "997212", qty: 1, rate: 95000 }, { desc: "Sound & lighting package", sac: "998596", qty: 1, rate: 25000 }, { desc: "Housekeeping & generator", sac: "998533", qty: 1, rate: 15000 }] },
  { id: "L-226", name: "Deepa Raghavan", org: "Infopark HR Forum", phone: "+91 97462 33418", email: "deepa@ihrf.org", interest: "Auditorium · half day", value: 45000, stage: "Quotation Sent", source: "Email", items: [{ desc: "Auditorium hire — half day", sac: "997212", qty: 1, rate: 38000 }, { desc: "Projector & mic setup", sac: "998596", qty: 1, rate: 7000 }] },
  { id: "L-224", name: "Shibu Antony", org: "Antony Logistics", phone: "+91 98950 77612", email: "shibu@antonylog.in", interest: "Office, 2000 sq ft", value: 74000, stage: "Negotiating", source: "Broker", items: [{ desc: "Monthly rent — PT-301", sac: "997212", qty: 1, rate: 68000 }, { desc: "Covered parking (2 slots)", sac: "997212", qty: 2, rate: 3000 }] },
  { id: "L-220", name: "Ramesh Iyer", org: "Kochi Rotary Club", phone: "+91 94460 99011", email: "ramesh@rotarykochi.org", interest: "Auditorium · Charity Gala", value: 95000, stage: "Won", source: "Repeat client", items: [{ desc: "Auditorium hire — evening", sac: "997212", qty: 1, rate: 80000 }, { desc: "Sound & lighting package", sac: "998596", qty: 1, rate: 15000 }] },
  { id: "L-218", name: "Faisal Rahman", org: "Indus Motors", phone: "+91 97440 55018", email: "faisal@indusmotors.in", interest: "Service bay, 1200 sq ft", value: 46000, stage: "Won", source: "Website", items: [{ desc: "Monthly rent — VC-105", sac: "997212", qty: 1, rate: 46000 }] },
  { id: "L-215", name: "Gopika Menon", org: "Menon Dance Academy", phone: "+91 90370 61245", email: "gopika@menondance.in", interest: "Auditorium · recital", value: 32000, stage: "Lost", source: "Instagram", items: [{ desc: "Auditorium hire — 4 hours", sac: "997212", qty: 1, rate: 32000 }] },
];

export type PaymentRow = {
  date: string;
  payer: string;
  source: "Lease" | "Booking";
  amount: number;
  mode: string;
  invoice: string;
  status: "Paid" | "Overdue" | "Pending";
};

export const payments: PaymentRow[] = [
  { date: "28 Oct 2026", payer: "Kerala Spice Traders LLP", source: "Lease", amount: 62000, mode: "NEFT", invoice: "INV/26-27/0412", status: "Paid" },
  { date: "27 Oct 2026", payer: "Federal Bank", source: "Booking", amount: 50000, mode: "RTGS", invoice: "INV/26-27/0411", status: "Paid" },
  { date: "26 Oct 2026", payer: "Kerala Startup Mission", source: "Booking", amount: 20000, mode: "UPI", invoice: "INV/26-27/0410", status: "Paid" },
  { date: "25 Oct 2026", payer: "Kalyan Silks Boutique", source: "Lease", amount: 54000, mode: "Cheque", invoice: "INV/26-27/0409", status: "Paid" },
  { date: "20 Oct 2026", payer: "Backwater Tech Solutions", source: "Lease", amount: 78000, mode: "—", invoice: "INV/26-27/0405", status: "Overdue" },
  { date: "18 Oct 2026", payer: "Chai Kada Café", source: "Lease", amount: 28000, mode: "—", invoice: "INV/26-27/0403", status: "Overdue" },
  { date: "15 Oct 2026", payer: "IMA Thrissur", source: "Booking", amount: 40000, mode: "—", invoice: "INV/26-27/0401", status: "Pending" },
  { date: "10 Oct 2026", payer: "Nair & Associates, CA", source: "Lease", amount: 38500, mode: "UPI", invoice: "INV/26-27/0398", status: "Paid" },
  { date: "08 Oct 2026", payer: "Mathew Pharma Distributors", source: "Lease", amount: 31500, mode: "NEFT", invoice: "INV/26-27/0396", status: "Paid" },
  { date: "05 Oct 2026", payer: "Kochi Rotary Club", source: "Booking", amount: 40000, mode: "Cheque", invoice: "INV/26-27/0394", status: "Paid" },
  { date: "03 Oct 2026", payer: "Indus Motors Service Point", source: "Lease", amount: 46000, mode: "NEFT", invoice: "INV/26-27/0391", status: "Paid" },
  { date: "02 Oct 2026", payer: "Federal Insurance Brokers", source: "Lease", amount: 35000, mode: "RTGS", invoice: "INV/26-27/0390", status: "Paid" },
  { date: "01 Oct 2026", payer: "Manappuram Finance", source: "Booking", amount: 35000, mode: "—", invoice: "INV/26-27/0388", status: "Pending" },
];

export const expenses = [
  { category: "Maintenance", property: "Pioneer Towers", desc: "Lift AMC — Q3 (Johnson Lifts)", amount: 48000, date: "24 Oct 2026" },
  { category: "Utilities", property: "Pioneer Towers", desc: "KSEB electricity — common area", amount: 36500, date: "20 Oct 2026" },
  { category: "Security", property: "All properties", desc: "Guard services — October", amount: 92000, date: "18 Oct 2026" },
  { category: "Housekeeping", property: "Sree Rama Convention Hall", desc: "Post-event deep cleaning (4 events)", amount: 28000, date: "16 Oct 2026" },
  { category: "Utilities", property: "Sree Rama Convention Hall", desc: "Generator diesel — 420 L", amount: 39900, date: "14 Oct 2026" },
  { category: "Repairs", property: "Lulu Arcade Annex", desc: "Waterproofing — terrace", amount: 64000, date: "12 Oct 2026" },
  { category: "Taxes", property: "All properties", desc: "Kochi Corporation property tax (H2)", amount: 118000, date: "10 Oct 2026" },
  { category: "Maintenance", property: "Vyttila Commerce Hub", desc: "Fire safety audit & refill", amount: 22500, date: "08 Oct 2026" },
  { category: "Housekeeping", property: "Pioneer Towers", desc: "Housekeeping staff — October", amount: 54000, date: "05 Oct 2026" },
  { category: "Repairs", property: "Kaloor Trade Plaza", desc: "Plumbing — washroom block B", amount: 14800, date: "03 Oct 2026" },
];

export const pnl = [
  { month: "May", income: 1480000, expense: 498000 },
  { month: "Jun", income: 1525000, expense: 512000 },
  { month: "Jul", income: 1612000, expense: 545000 },
  { month: "Aug", income: 1594000, expense: 488000 },
  { month: "Sep", income: 1688000, expense: 531000 },
  { month: "Oct", income: 1756000, expense: 517700 },
];

export const gstMonthly = [
  { month: "May", taxable: 1480000, cgst: 133200, sgst: 133200, igst: 0 },
  { month: "Jun", taxable: 1525000, cgst: 137250, sgst: 137250, igst: 9000 },
  { month: "Jul", taxable: 1612000, cgst: 145080, sgst: 145080, igst: 0 },
  { month: "Aug", taxable: 1594000, cgst: 143460, sgst: 143460, igst: 0 },
  { month: "Sep", taxable: 1688000, cgst: 151920, sgst: 151920, igst: 16200 },
  { month: "Oct", taxable: 1756000, cgst: 158040, sgst: 158040, igst: 0 },
];
