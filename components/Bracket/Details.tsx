import * as React from "react";
import styled, { css } from "../../styles/styled-components";
import { media } from "../../styles/utils/breakpoint";
import { BracketStoreContext } from "./Store";
import formatNumber from "../../utils/formatNumber";
import findLogo from "../../utils/findLogo";
import useClickOutside from "../hooks/useClickOutside";
import ArrowIcon from "../icons/Arrow";
import AddIcon from "../icons/Add";
import DownloadIcon from "../icons/Download";
import DefaultLogo from "../DefaultLogo";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const Modal = styled.div`
  display: flex;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  flex-direction: column;

  ${media.small`
    flex-direction: row;
  `}
`;

const BottomSection = styled.section`
  padding: 1rem 0;
  background: #fff;
  box-shadow: 0 -1.25rem 1rem -1.25rem rgba(0, 0, 0, 0.1);
`;

const Stats = styled.div`
  display: flex;
`;

const Card = styled.div`
  background: #ddd;
  min-width: 250px;
  color: #151515;
  margin-top: 0.25rem;

  ${(props: { winner?: boolean; index?: number }) =>
    props.winner &&
    css`
      background: #fff;

      &:before {
        content: "";
        position: absolute;
        top: -3rem;
        left: -1.125rem;
        right: auto;
        font-size: 4rem;
        transform: rotate(-25deg);

        ${media.small`
          content: "👑";
        `}

        ${props.index === 1 &&
          css`
            left: auto;
            right: -1.125rem;
            transform: rotate(25deg);
          `}
      }
    `}

  ${media.small`
    margin-top: 0;
  `}

  &:not(:last-child) {
    border-right: 1px solid #ddd;
  }

  p {
    margin: 0;
  }
`;

const TopSection = styled.section`
  height: 8.75rem;
  padding: 1.25rem;
  text-align: center;
`;

const Outcome = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  top: 0.625rem;
  width: fit-content;
  margin: 0 auto;
  padding: 0.1rem 0.5rem;
  background: #fff;
  box-shadow: 0 0 0.3125rem 0 rgba(0, 0, 0, 0.1);
`;

const Downloads = styled.div`
  padding: 0.25rem 1rem;
  width: 50%;

  &:not(:last-child) {
    border-right: 1px solid #eee;
  }

  p:first-child {
    display: flex;
    align-items: center;
    font-size: 1rem;
  }
`;

const Date = styled.p`
  font-size: 0.75rem;
`;

const Image = styled.img`
  width: auto;
  height: 5rem;
  max-width: 6.25rem;
`;

const Title = styled.h2`
  position: absolute;
  top: -1.8rem;
  color: #fff;
  text-align: center;
  width: 100%;
  font-size: 1.25rem;
`;

const CloseButton = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: -2.2rem;
  margin: 0 auto;
  width: 2rem;
  stroke: #fff;
  transform: rotate(45deg);
  cursor: pointer;
`;

const isPositive = (num: number): boolean => num > 0;

const Details: React.FunctionComponent = (): JSX.Element | null => {
  const {
    state: { details },
    dispatch,
  } = React.useContext(BracketStoreContext);

  const handleClose = (): void => {
    dispatch({ type: "UNSET_DETAILS" });
    dispatch({ type: "SET_HIGHLIGHT", name: "" });
  };

  const [ref] = useClickOutside(handleClose);

  if (!details) {
    return null;
  }

  const winner = details.reduce((a, b) => (a.outcome! > b.outcome! ? a : b));

  return (
    <React.Fragment>
      <Overlay />
      <Modal ref={ref}>
        {details.length > 1 && <Title>Match Overview</Title>}
        {details &&
          details.map((detail, index) => {
            const logoUrl = findLogo(detail.package.toLowerCase());
            return (
              <Card
                key={detail.package}
                winner={detail.package === winner.package}
                index={index}
              >
                <TopSection>
                  {logoUrl ? (
                    <Image src={logoUrl} alt="Logo" />
                  ) : (
                    <DefaultLogo
                      name={detail.package}
                      style={{ width: 70, height: 70 }}
                    />
                  )}
                  <p>{detail.package}</p>
                </TopSection>
                <Outcome>
                  <ArrowIcon
                    width={16}
                    height={16}
                    variant={
                      isPositive(detail.outcome!) ? "increase" : "decrease"
                    }
                    style={{ marginRight: "0.3rem" }}
                  />
                  <p>{detail.outcome}%</p>
                </Outcome>

                <BottomSection>
                  <Stats>
                    {detail.downloads.map((download, index) => (
                      <Downloads key={index}>
                        <p>
                          <DownloadIcon
                            width={7.2}
                            height={16}
                            fill="#999"
                            style={{ marginRight: "0.3rem" }}
                          />
                          {formatNumber(download.downloads)}
                        </p>
                        <Date>{download.day}</Date>
                      </Downloads>
                    ))}
                  </Stats>
                </BottomSection>
              </Card>
            );
          })}
        <CloseButton onClick={handleClose}>
          <AddIcon title="Close" stroke="#fff" />
        </CloseButton>
      </Modal>
    </React.Fragment>
  );
};

export default Details;
