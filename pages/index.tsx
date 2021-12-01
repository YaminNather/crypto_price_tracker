import { GetServerSidePropsContext, GetServerSidePropsResult, NextPage } from "next";

export interface Props {

}

const IndexPage: NextPage = (props) => {
  return <></>;
};

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Props>> {
  return {
    redirect: {
      destination: "/coins/bitcoin",
      permanent: false
    }
  };
}

export default IndexPage;