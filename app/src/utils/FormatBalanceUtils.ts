const formatBalance = (balance:any) => {
    if (balance === undefined) return "-";
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 2,
    })
        .format(balance)
        .replace("IDR", "Rp");
};

export default formatBalance;