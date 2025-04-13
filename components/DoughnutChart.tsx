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

  return (
    <View style={styles.container}>
      <Svg width={200} height={200}>
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
              strokeLinecap="butt"
            />
          );

          cumulativePercent += percentage;
          return segment;
        })}
      </Svg>

      {/* Center label */}
      <View style={styles.centerText}>
        <Text style={styles.percentageText}>
          {((data[0] / total) * 100).toFixed(1)}%
        </Text>
        <Text style={styles.labelText}>{labels[0]}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: 220,
  },
  centerText: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  percentageText: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#333",
  },
  labelText: {
    fontSize: 12,
    color: "#666",
  },
});

export default DoughnutChart;
