import { Card } from "@/components/ui/card";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const data = [
  { name: 'Jan', sales: 4000, fees: 2400 },
  { name: 'Feb', sales: 3000, fees: 1398 },
  { name: 'Mar', sales: 2000, fees: 9800 },
  { name: 'Apr', sales: 2780, fees: 3908 },
  { name: 'May', sales: 1890, fees: 4800 },
  { name: 'Jun', sales: 2390, fees: 3800 },
];

const categoryData = [
  { name: 'Hotels', sales: 4000 },
  { name: 'Flights', sales: 3000 },
  { name: 'Packages', sales: 2000 },
  { name: 'Activities', sales: 2780 },
];

const MySales = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-4xl font-bold tracking-tight">My Sales</h1>
          <p className="text-muted-foreground mt-2">Track your sales performance and metrics.</p>
        </div>
        <DatePickerWithRange />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Total Sales</h3>
          <p className="mt-2 text-3xl font-bold">$12,345</p>
          <p className="text-xs text-emerald-500 mt-1">+12.3% from last month</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Total Fees</h3>
          <p className="mt-2 text-3xl font-bold">$1,234</p>
          <p className="text-xs text-emerald-500 mt-1">+8.1% from last month</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Number of Orders</h3>
          <p className="mt-2 text-3xl font-bold">45</p>
          <p className="text-xs text-rose-500 mt-1">-2.3% from last month</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Conversion Rate</h3>
          <p className="mt-2 text-3xl font-bold">24.5%</p>
          <p className="text-xs text-emerald-500 mt-1">+4.1% from last month</p>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Sales Overview</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="sales" stroke="#2563eb" fill="#3b82f6" />
                <Area type="monotone" dataKey="fees" stroke="#059669" fill="#10b981" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Sales by Category</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MySales;