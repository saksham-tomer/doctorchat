"use client";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { FlipHorizontal } from "lucide-react";

const chartData = [
  { day: "Monday", patients: 186 },
  { day: "Tuesday", patients: 305 },
  { day: "Wednesday", patients: 237 },
  { day: "Thursday", patients: 73 },
  { day: "Friday", patients: 209 },
  { day: "Saturday", patients: 214 },
  { day: "Sunday", patients: 214 },
];

function getTrend(prevDay: number, today: number): string {
  let trend: number = ((today - prevDay) / 7) * 100;
  return trend.toFixed(1);
}

const chart1Data = [
  { day: "Monday", patients: 186 },
  { day: "Tuesday", patients: 305 },
  { day: "Wednesday", patients: 237 },
  { day: "Thursday", patients: 73 },
  { day: "Friday", patients: 209 },
  { day: "Saturday", patients: 214 },
  { day: "Sunday", patients: 214 },
];
const chart1Config = {
  desktop: {
    label: "Patients",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const chartConfig = {
  patients: {
    label: "patients",
    color: "purple",
  },
} satisfies ChartConfig;

type ChartData = {
  title: string;
};

export function Barchart({ data }: { data: ChartData }) {
  const [flip, setFlip] = useState<boolean>(false);
  const [trend, setTrend] = useState<number | string>();
  const [todayDate, setTodayDate] = useState<number | string>();
  useEffect(() => {
    let todayDate = new Date().toISOString().slice(0, 10);
    setTodayDate(todayDate);
    setTrend((prev) => (prev = getTrend(4, 4.23)));
  }, [trend]);
  let date = new Date();
  date.getDate();
  return (
    <Card className="lg:min-w-80">
      <CardHeader>
        <div className="flex flex-row">
          <CardTitle>{data.title}</CardTitle>
          <div
            className="ml-auto hover:cursor-pointer"
            onClick={() => setFlip((flip: boolean) => !flip)}
          >
            <FlipHorizontal className="h-6 w-6" />
          </div>
        </div>
        <CardDescription>{todayDate}</CardDescription>
      </CardHeader>
      {flip ? (
        <CardContent>
          <ChartContainer config={chart1Config}>
            <LineChart
              accessibilityLayer
              data={chart1Data}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Line
                dataKey="patients"
                type="natural"
                stroke="purple"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      ) : (
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="day"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="patients" fill="var(--color-patients)" radius={8} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      )}
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by {trend}% this day <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 days
        </div>
      </CardFooter>
    </Card>
  );
}
