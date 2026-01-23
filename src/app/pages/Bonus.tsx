import React from "react";
import { useParams } from "react-router-dom";
import { SpinWheelBonus } from "./SpinWheelBonus";
import { VoucherScratchBonus } from "./VoucherScratchBonus";
import { PrizeBoxBonus } from "./PrizeBoxBonus";
import { ComingSoon } from "./ComingSoon";

export function Bonus() {
  const { bonusType } = useParams();

  switch (bonusType) {
    case 'wheel':
      return <SpinWheelBonus />;
    case 'scratch':
      return <VoucherScratchBonus />;
    case 'prize':
      return <PrizeBoxBonus />;
    default:
      return (
        <ComingSoon
          title="Bonus"
          description="Bonus 页面尚未实现（当前为占位页面）。"
          backTo="/"
          backLabel="Home"
        />
      );
  }
}

