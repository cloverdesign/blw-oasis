export const Who = () => {
  return (
    <section className="lg:min-h-screen flex flex-col lg:flex-row justify-center items-center gap-10 px-10 lg:gap-32 lg:px-32 py-32 bg-foreground text-background">
      <h2 className="w-full whitespace-nowrap text-left text-2xl capitalize lg:text-4xl">
        Who we are.
      </h2>
      <p className="text-xl lg:text-4xl text-center lg:text-left">
        Oasis is a student-centered campus ministry committed to raising
        confident, faith-rooted leaders who influence their campuses and
        communities. We exist to help students grow spiritually, build
        meaningful community, and live boldly for Christ right where they are.
        <br />
        <br />
        Whether you are new to faith, returning, or searching for something
        deeper, there is a place for you here.
      </p>
    </section>
  );
};
