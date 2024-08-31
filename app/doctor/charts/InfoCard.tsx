import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Separator } from "@/components/ui/separator";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

type CardProps = {
  title: string;
  img: string;
  count: number;
  footer: string;
};

const chartConfig = {
  desktop: {
    label: "Count",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
];

function InfoCard({ title, img, count, footer }: CardProps) {
  return (
    <div className="p-2 min-h-32 min-w-80 md:min-w-52 lg:min-w-96 xl:min-w-96 bg-white rounded-xl shadow-md">
      <div className="flex flex-row px-1 py-2 items-center justify-center">
        <div className="mr-auto flex flex-row gap-3 items-center justify-center">
          <Image src={img} alt="title" width={25} />
          <p className="font-semibold text-sm">{title}</p>
        </div>
        <ArrowRight width={16} height={16} />
      </div>
      <Separator />
      <div className="px-1 py-2 flex md:flex-row flex-col lg:flex-row xl:flex-row items-center justify-center">
        <div className="flex flex-col gap-1 mr-auto px-2">
          <p className="font-bold text-lg">{count}</p>
          <p className="text-xs text-slate-500">Available {footer}</p>
        </div>
        <div className="min-w-40">
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8} />
            </BarChart>
          </ChartContainer>
        </div>
      </div>
    </div>
  );
}

export default InfoCard;
