interface Transaction {
    category?: string;
    isIncome: boolean;
    amount: number;
  }
  
  function groupTransactionsByExpenseAndCategory(transactions: Transaction[] | undefined): {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
      borderColor: string;
      borderWidth: number;
    }[];
  } {
    const expenseCategories: Record<string, number> = {};
    
    transactions?.forEach((tx) => {
      const key = tx.category || "Others";
      if (!tx.isIncome) {
        expenseCategories[key] = (expenseCategories[key] || 0) + tx.amount;
      }
    });
    
    const labels = Object.keys(expenseCategories);
    const dataValues = Object.values(expenseCategories);
    
    const backgroundColor = [
      "#A8DADC",
      "#457B9D",
      "#F4A261",
      "#E76F51",
      "#2A9D8F",
      "#F7B801",
      "#FF9F1C",
      "#9C89B8",
      "#00A896",
      "#F94144",
    ].slice(0, labels.length);
    
    return {
      labels,
      datasets: [
        {
          label: "Expenses",
          data: dataValues,
          backgroundColor,
          borderColor: "#ffffff",
          borderWidth: 2,
        },
      ],
    };
  }
  
  function groupTransactionsByIncomeAndCategory(transactions: Transaction[] | undefined): {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
      borderColor: string;
      borderWidth: number;
    }[];
  } {
    const incomeCategories: Record<string, number> = {};
    
    transactions?.forEach((tx) => {
      if (tx.isIncome) {
        const key =
          tx.category === "Top Up" || tx.category === "Salary"
            ? tx.category
            : "Transfer In";
        incomeCategories[key] = (incomeCategories[key] || 0) + tx.amount;
      }
    });
    
    const labels = Object.keys(incomeCategories);
    const dataValues = Object.values(incomeCategories);
    
    const backgroundColor = [
      "#A8DADC",
      "#457B9D",
      "#F4A261",
      "#E76F51",
      "#2A9D8F",
      "#F7B801",
      "#FF9F1C",
      "#9C89B8",
      "#00A896",
      "#F94144",
    ].slice(0, labels.length);
    
    return {
      labels,
      datasets: [
        {
          label: "Income",
          data: dataValues,
          backgroundColor,
          borderColor: "#ffffff",
          borderWidth: 2,
        },
      ],
    };
  }
  
  type ChartData = {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
      borderColor: string;
      borderWidth: number;
    }[];
  };
  
  export {
    groupTransactionsByIncomeAndCategory,
    groupTransactionsByExpenseAndCategory,
  };