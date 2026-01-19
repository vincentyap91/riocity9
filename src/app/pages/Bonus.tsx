import React from "react";
import { useParams } from "react-router-dom";
import { ComingSoon } from "./ComingSoon";

export function Bonus() {
  const { bonusType } = useParams();

  const titleMap: Record<string, string> = {
    wheel: "Spin Wheel Bonus",
    scratch: "Voucher Scratch Bonus",
    prize: "Prize Box Bonus",
  };

  const title = bonusType ? titleMap[bonusType] || `Bonus: ${bonusType}` : "Bonus";

  return (
    <ComingSoon
      title={title}
      description="Bonus 页面尚未实现（当前为占位页面）。"
      backTo="/"
      backLabel="Home"
    />
  );
}

