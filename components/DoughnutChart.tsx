import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg";

interface DoughnutChartProps {
  categories: {
    data: number[];
    colors: string[];
    labels: string[];
  };
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({ categories }) => {
  const { data, colors, labels } = categories;

  const total = data.reduce((sum, val) => sum + val, 0);
  const radius = 80;
  const strokeWidth = 40;
  const center = 100;
  const circumference = 2 * Math.PI * radius;

  let cumulativePercent = 0;

  // Get the max category for center display
  const maxIndex = data.indexOf(Math.max(...data));
  const maxPercentage = ((data[maxIndex] / total) * 100).toFixed(1);
  const maxLabel = labels[maxIndex];

  return (
    <View style={styles.container}>
      <Svg width={200} height={200} style={styles.svg}>
        {data.map((value, index) => {
          const percentage = value / total;
          const strokeDashoffset = circumference * (1 - percentage);
          const rotation = cumulativePercent * 360;

          const segment = (
            <Circle
              key={index}
              cx={center}
              cy={center}
              r={radius}
              stroke={colors[index]}
              strokeWidth={strokeWidth}
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={strokeDashoffset}
              rotation={rotation}
              origin={`${center}, ${center}`}
              strokeLinecap="round"
              fill="none"
            />
          );

          cumulativePercent += percentage;
          return segment;
        })}
      </Svg>

      {/* Center label */}
      <View style={styles.centerText}>
        <Text style={styles.percentageText}>{maxPercentage}%</Text>
        <Text style={styles.labelText}>{maxLabel}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  svg: {
    backgroundColor: 'transparent',
  },
  centerText: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  percentageText: {
    fontWeight: "700",
    fontSize: 22,
    color: "#111827", // dark text for contrast
  },
  labelText: {
    fontSize: 14,
    color: "#6B7280", // muted gray
    marginTop: 2,
  },
});

export default DoughnutChart;