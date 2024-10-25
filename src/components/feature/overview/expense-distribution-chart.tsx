"use client"

import { useMemo } from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { Card, CardContent } from "@/components/ui/shadcn/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/shadcn/chart"

type Props = {
    chartData: {
        date: string;
        expenses: number
    }[]
}

const chartConfig = {
    expense: { label: "Total Expenses" },
    expenses: { label: "expenses", color: "#ea5166" },
} satisfies ChartConfig

const TICK_POSITIONS = {
    31: [1, 5, 10, 15, 20, 25, 31],
    30: [1, 5, 10, 15, 20, 25, 30],
    29: [1, 5, 10, 15, 20, 25, 29],
    28: [1, 5, 10, 14, 19, 24, 28]
};

function ExpenseDistributionChart({ chartData }: Props) {
    const xAxisTicks = useMemo(() => {
        if (chartData.length === 0) return [];

        const firstDate = new Date(chartData[0].date);
        const year = firstDate.getFullYear();
        const month = firstDate.getMonth();
        const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
        
        let daysInMonth;
        if (month === 1) {
            daysInMonth = isLeapYear ? 29 : 28;
        } else {
            daysInMonth = new Date(year, month + 1, 0).getDate();
        }

        const tickPositions = TICK_POSITIONS[daysInMonth as keyof typeof TICK_POSITIONS];

        return tickPositions.map(day => {
            const date = new Date(year, month, day);
            return date.toISOString().split('T')[0]; 
        });
    }, [chartData]);

    return (
        <Card className="border-secondary bg-primary shadow-none text-accent border-2 rounded-xl">
            <CardContent className="p-2 sm:p-6">
                <ChartContainer config={chartConfig} className="aspect-auto h-80 w-full pt-4">
                    <BarChart accessibilityLayer data={chartData} margin={{ left: 0, right: 0, top: 0, bottom: 0 }}>
                        <CartesianGrid 
                            vertical={false} 
                            horizontal={true}
                            stroke="#f295a3" 
                        />

                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            className="text-semibold"
                            axisLine={false}
                            tickMargin={12}
                            ticks={xAxisTicks}
                            tickFormatter={(value) => {
                                const date = new Date(value)
                                return date.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                })
                            }}
                            tick={({ x, y, payload }) => (
                                <text 
                                    x={x} 
                                    y={y} 
                                    dy={8} 
                                    textAnchor="middle" 
                                    fill="#ea5166" 
                                    fontSize={12}
                                    fontWeight="bold"   
                                >
                                    {new Date(payload.value).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                    })}
                                </text>
                            )}
                        />

                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    className="w-[12rem] pr-5"
                                    nameKey="expense"
                                    labelFormatter={(value) => {
                                        return new Date(value).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        })
                                    }}
                                />
                            }
                        />

                        <Bar 
                            type="monotone"
                            dataKey="expenses" 
                            stroke="var(--color-expenses)"
                            fill="var(--color-expenses)"
                            fillOpacity={1}
                            radius={[3, 3, 0, 0]}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

export default ExpenseDistributionChart;