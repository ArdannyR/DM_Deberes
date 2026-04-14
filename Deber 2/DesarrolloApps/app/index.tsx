import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import CalculatorButton from "../components/CalculatorButton";
import { Colors } from "../constants/theme";

const CalculatorApp = () => {
  const [displayValue, setDisplayValue] = useState("0");
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operator, setOperator] = useState<string | null>(null);

  const formatResult = (value: number) => {
    const text = value.toString();
    return text.includes(".") ? parseFloat(text).toString() : text;
  };

  const clearAll = () => {
    setDisplayValue("0");
    setPreviousValue(null);
    setOperator(null);
  };

  const toggleSign = () => {
    if (displayValue === "Error") return;
    if (displayValue === "0") return;
    setDisplayValue(displayValue.startsWith("-") ? displayValue.slice(1) : `-${displayValue}`);
  };

  const calculatePercentage = () => {
    if (displayValue === "Error") return;
    const currentValue = parseFloat(displayValue);
    setDisplayValue(formatResult(currentValue / 100));
  };

  const handleNumber = (num: string) => {
    if (displayValue === "Error") {
      setDisplayValue(num === "." ? "0." : num);
      return;
    }

    if (num === ".") {
      if (displayValue.includes(".")) return;
      setDisplayValue(`${displayValue}.`);
      return;
    }

    if (displayValue === "0") {
      setDisplayValue(num);
      return;
    }

    setDisplayValue(`${displayValue}${num}`);
  };

  const computeResult = (firstValue: string, secondValue: string, op: string) => {
    const a = parseFloat(firstValue);
    const b = parseFloat(secondValue);

    if (isNaN(a) || isNaN(b)) return "Error";

    let result: number;
    switch (op) {
      case "+":
        result = a + b;
        break;
      case "-":
        result = a - b;
        break;
      case "*":
        result = a * b;
        break;
      case "/":
        if (b === 0) return "Error";
        result = a / b;
        break;
      default:
        return "Error";
    }

    return formatResult(result);
  };

  const handleOperator = (op: string) => {
    if (displayValue === "Error") return;

    if (previousValue !== null && operator !== null) {
      const result = computeResult(previousValue, displayValue, operator);
      setPreviousValue(result === "Error" ? null : result);
      setDisplayValue(result);
    } else {
      setPreviousValue(displayValue);
    }

    setOperator(op);
    setDisplayValue("0");
  };

  const calculateResult = () => {
    if (previousValue === null || operator === null || displayValue === "Error") return;

    const result = computeResult(previousValue, displayValue, operator);
    setDisplayValue(result);
    setPreviousValue(null);
    setOperator(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.displayContainer}>
        <Text style={styles.displayText}>{displayValue}</Text>
      </View>

      <View style={styles.row}>
        <CalculatorButton label="AC" backgroundColor={Colors.buttonLightGray} textColor={Colors.background} onPress={clearAll} />
        <CalculatorButton label="+/-" backgroundColor={Colors.buttonLightGray} textColor={Colors.background} onPress={toggleSign} />
        <CalculatorButton label="%" backgroundColor={Colors.buttonLightGray} textColor={Colors.background} onPress={calculatePercentage} />
        <CalculatorButton label="÷" backgroundColor={Colors.orange} textColor={Colors.textPrimary} onPress={() => handleOperator("/")} />
      </View>

      <View style={styles.row}>
        <CalculatorButton label="7" backgroundColor={Colors.darkGray} textColor={Colors.textPrimary} onPress={() => handleNumber("7")} />
        <CalculatorButton label="8" backgroundColor={Colors.darkGray} textColor={Colors.textPrimary} onPress={() => handleNumber("8")} />
        <CalculatorButton label="9" backgroundColor={Colors.darkGray} textColor={Colors.textPrimary} onPress={() => handleNumber("9")} />
        <CalculatorButton label="×" backgroundColor={Colors.orange} textColor={Colors.textPrimary} onPress={() => handleOperator("*")} />
      </View>

      <View style={styles.row}>
        <CalculatorButton label="4" backgroundColor={Colors.darkGray} textColor={Colors.textPrimary} onPress={() => handleNumber("4")} />
        <CalculatorButton label="5" backgroundColor={Colors.darkGray} textColor={Colors.textPrimary} onPress={() => handleNumber("5")} />
        <CalculatorButton label="6" backgroundColor={Colors.darkGray} textColor={Colors.textPrimary} onPress={() => handleNumber("6")} />
        <CalculatorButton label="-" backgroundColor={Colors.orange} textColor={Colors.textPrimary} onPress={() => handleOperator("-")} />
      </View>

      <View style={styles.row}>
        <CalculatorButton label="1" backgroundColor={Colors.darkGray} textColor={Colors.textPrimary} onPress={() => handleNumber("1")} />
        <CalculatorButton label="2" backgroundColor={Colors.darkGray} textColor={Colors.textPrimary} onPress={() => handleNumber("2")} />
        <CalculatorButton label="3" backgroundColor={Colors.darkGray} textColor={Colors.textPrimary} onPress={() => handleNumber("3")} />
        <CalculatorButton label="+" backgroundColor={Colors.orange} textColor={Colors.textPrimary} onPress={() => handleOperator("+")} />
      </View>

      <View style={styles.row}>
        <CalculatorButton label="0" backgroundColor={Colors.darkGray} textColor={Colors.textPrimary} doubleWidth={true} onPress={() => handleNumber("0")} />
        <CalculatorButton label="." backgroundColor={Colors.darkGray} textColor={Colors.textPrimary} onPress={() => handleNumber(".")} />
        <CalculatorButton label="=" backgroundColor={Colors.orange} textColor={Colors.textPrimary} onPress={calculateResult} />
      </View>
    </View>
  );
};

export default CalculatorApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: "flex-end",
    padding: 16,
  },
  displayContainer: {
    alignItems: "flex-end",
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  displayText: {
    color: Colors.textPrimary,
    fontSize: 70,
    lineHeight: 80,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
});
