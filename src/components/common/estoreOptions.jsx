const statusOptions = [
  { num: "0", desc: "- Select -" },
  { num: "1", desc: "pending" },
  { num: "2", desc: "pause" },
  { num: "3", desc: "stop" },
  { num: "4", desc: "active" },
];

const durationOptions = [
  { num: "0", desc: "- Select -", value: "0" },
  { num: "1", desc: "1 Week", value: "7" },
  { num: "2", desc: "1 Month", value: "31" },
  { num: "3", desc: "6 Months", value: "185" },
  { num: "4", desc: "1 Year", value: "370" },
];

const planOptions = [
  { num: "0", desc: "- Select -" },
  { num: "1", desc: "plan-1" },
  { num: "2", desc: "plan-2" },
  { num: "3", desc: "plan-3" },
];

const recurringCycle = [
  { num: "0", desc: "- Select -" },
  { num: "1", desc: "One" },
  { num: "2", desc: "Unlimited" },
];
  
const estoreOptions = {
  statusOptions,
  durationOptions,
  planOptions,
  recurringCycle
}

export default estoreOptions;