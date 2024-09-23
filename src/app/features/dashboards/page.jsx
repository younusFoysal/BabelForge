import DashboardCard from "@/components/DashboardsPage/DashboardCard";
import Header from "@/components/DashboardsPage/Header";
import card1 from "../../../image/dashboards/card1.png";
import card2 from "../../../image/dashboards/card2.png";
import card3 from "../../../image/dashboards/card3.png";

const Dashboards = () => {
  return (
    <section>
      <Header />
      <div className="container mx-auto">
        <DashboardCard
          row={"row"}
          subtitle={"High-level overview"}
          title={"Gain real-time insights"}
          description={
            "Easily analyze your data and simplify strategic decision-making with custom dashboards. Run reports, create summaries, track progress, and get a high-level overview of your entire organization."
          }
          image={card1}
        />
        <DashboardCard
          row={"row-reverse"}
          subtitle={"Dashboard customization"}
          title={"View data your way"}
          description={
            "Build the reporting tools you need for your business with customizable no-code dashboards. Add widgets such as charts and timeline to help further visualize your data and stay up-to-date on progress and results."
          }
          image={card2}
        />
        <DashboardCard
          row={"row"}
          subtitle={"Resource management"}
          title={"Prioritize work smarter"}
          description={
            "Adapt to changes and prioritize workloads strategically to boost team productivity and facilitate more efficient workflows. Quickly identify what needs your attention and catch potential risks before they happen."
          }
          image={card3}
        />
      </div>
    </section>
  );
};

export default Dashboards;
