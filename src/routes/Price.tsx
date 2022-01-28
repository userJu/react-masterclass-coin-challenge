import React from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinTickers } from "./api";
import { IPriceData } from "./Coin";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InfoContainer = styled.div`
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 16px 12px;
  border-radius: 10px;
`;

const CoinInfo = styled.div`
  padding: 10px;
  p {
    font-size: 13px;
    padding: 1px;
  }
`;

interface PriceProps {
  coinId: string;
}

const Price = ({ coinId }: PriceProps) => {
  const { isLoading, data } = useQuery<IPriceData>(["price", coinId], () =>
    fetchCoinTickers(coinId)
  );
  const coinPrice = data?.quotes.USD;
  console.log(coinPrice);
  return (
    <Container>
      {isLoading ? (
        "Loading..."
      ) : (
        <InfoContainer>
          <CoinInfo>
            <p>ATH : all time height</p>
            <p>date : {coinPrice?.ath_date.slice(0, 10)}</p>
            <p>price : $ {coinPrice?.ath_price.toFixed(3)}</p>
          </CoinInfo>

          <CoinInfo>
            <p>시가총액 : $ {coinPrice?.market_cap.toLocaleString()}</p>
          </CoinInfo>

          <CoinInfo>
            <p>퍼센트 변화</p>
            <p>12h : {coinPrice?.percent_change_12h}%</p>
          </CoinInfo>

          <CoinInfo>
            <p>거래량 : {coinPrice?.volume_24h}</p>
          </CoinInfo>
        </InfoContainer>
      )}
    </Container>
  );
};

export default Price;
