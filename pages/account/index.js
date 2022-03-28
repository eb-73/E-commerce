const UserPage = () => {};
export async function getServerSideProps() {
  return {
    redirect: {
      source: "/account",
      destination: "/account/profile",
      permanent: true,
    },
  };
}
export default UserPage;
