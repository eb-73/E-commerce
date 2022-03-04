const UserPage = () => {};
export async function getStaticProps() {
  return {
    redirect: {
      source: "/account",
      destination: "/account/profile",
      permanent: true,
    },
  };
}
export default UserPage;
