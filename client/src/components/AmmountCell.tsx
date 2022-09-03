import { Tooltip, Typography } from "antd";

type Props = {
  ammount: number;
};

export const AmmountCell = ({ ammount }: Props) => {
  const isIncome = ammount > 0;

  const color = isIncome ? "#52c41a" : "#f5222d";

  return (
    <Tooltip title={isIncome ? "Income" : "Expense"}>
      <Typography.Text style={{ color }}>{Math.abs(ammount)}</Typography.Text>
    </Tooltip>
  );
};
