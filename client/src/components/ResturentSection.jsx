import RestaurantCard from "./RestaurantCard";

const restaurants = [1, 2, 3, 4, 5, 6];

const RestaurantSection = () => {
  return (
    <section className="bg-(--background-color) py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mb-14 flex items-end justify-between">
          <div>
            <span className="rounded-full bg-(--surface-color) px-4 py-2 font-medium text-(--primary-color)">
              Featured
            </span>

            <h2 className="mt-5 text-5xl font-bold text-(--text-color)">
              Popular Restaurants
            </h2>

            <p className="mt-3 text-lg text-(--text-light)">
              Discover the highest-rated restaurants near you.
            </p>
          </div>

          <button className="block rounded-xl border border-(--primary-color) px-6 py-3 font-medium text-(--primary-color) transition hover:bg-(--primary-color) hover:text-white">
            View All
          </button>
        </div>

        {/* Cards */}
        <div className="grid gap-8 grid-cols-3">
          {restaurants.map((item) => (
            <RestaurantCard />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RestaurantSection;
