import React from 'react';
import { useTheme, useMediaQuery } from '@chakra-ui/react';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from 'recharts';

interface Props {
  data: Stats;
}

const RADIAN = Math.PI / 180;

const Chart = ({ data }: Props) => {
  const theme = useTheme();
  const [isSmallDesktop] = useMediaQuery('(min-width: 1024px)');

  const colors = [
    theme.colors.red['200'],
    theme.colors.orange['300'],
    theme.colors.yellow['200'],
    theme.colors.blue['200'],
    theme.colors.green['200']
  ];
  const labelColors = [
    theme.colors.red['400'],
    theme.colors.orange['500'],
    theme.colors.yellow['400'],
    theme.colors.blue['400'],
    theme.colors.green['400']
  ];

  return (
    <ResponsiveContainer width="100%" height={isSmallDesktop ? 300 : 200}>
      <PieChart>
        <Legend verticalAlign="top" layout="vertical" align="left" />
        <Pie
          data={[
            {
              name: 'On Sprues',
              value: data.totalOnSprues
            },
            {
              name: 'Assembled',
              value: data.totalAssembled
            },
            {
              name: 'Primed',
              value: data.totalPrimed
            },
            {
              name: 'Painted',
              value: data.totalPainted
            },
            {
              name: 'Based',
              value: data.totalBased
            }
          ]}
          nameKey="name"
          dataKey="value"
          legendType="circle"
          label={({ cx, cy, midAngle, innerRadius, outerRadius, value, index }) => {
            const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
            const x = cx + (radius * Math.cos(-midAngle * RADIAN));
            const y = cy + (radius * Math.sin(-midAngle * RADIAN));

            if (!value) {
              return;
            }

            return (
              <text
                x={x}
                y={y}
                fill={labelColors[index]}
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
                fontSize="0.75rem"
                fontWeight="600"
              >
                {value}
              </text>
            );
          }}
          labelLine={false}
        >
          {colors.map((c, i) => (
            <Cell key={`pie-slice-${i}`} stroke={c} fill={c} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};
export default Chart;
