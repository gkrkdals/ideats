import Header from "@/app/admin/components/molecule/Header";
import Container from "@/app/admin/components/atom/Container";
import ImageOrder from "@/app/admin/components/organism/ImageOrder";
import Head from "next/head";

export default function Page() {
  return (
    <>
      <Head>
        <title>관리자 페이지</title>
      </Head>
      <Header />
      <Container>
        <ImageOrder />
      </Container>
    </>
  )
}