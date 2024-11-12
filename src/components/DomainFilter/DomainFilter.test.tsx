import DomainFilter from "./DomainFilter.component";
import { render, screen } from "@testing-library/react";

describe("components", () => {
  describe("Basic from repository", () => {
    it("should allow the user to filter", () => {
      render(
        <DomainFilter
          domains={[
            "US_OK-WOK",
            "FR_NK-WOL",
            "FR_OK-NPP",
            "EN_NK-NRP",
            "EN_BL-WOL",
          ]}
          pattern="{country code}_{classification}-{sub classification}"
        />
      );

      expect(screen.getAllByRole("listbox")).toHaveLength(3);
    });

    it("should render", async () => {
      render(
        <DomainFilter
          domains={[
            "US_OK-WOK",
            "FR_NK-WOL",
            "FR_OK-NPP",
            "EN_NK-NRP",
            "EN_BL-WOL",
          ]}
          pattern="{country code}_{classification}-{sub classification}"
        />
      );

      expect(await screen.findByText("EN")).toBeTruthy();
    });
  });
  describe("Pattern test delimiter", () => {
    it("should allow the user to filter", () => {
      render(
        <DomainFilter
          domains={[
            "US;OK-WOK",
            "FR;NK-WOL",
            "FR;OK-NPP",
            "EN;NK-NRP",
            "EN;BL-WOL",
          ]}
          pattern="{country code};{classification}-{sub classification}"
        />
      );

      expect(screen.getAllByRole("listbox")).toHaveLength(3);
    });

    it("should render", async () => {
      render(
        <DomainFilter
          domains={[
            "US;OK-WOK",
            "FR;NK-WOL",
            "FR;OK-NPP",
            "EN;NK-NRP",
            "EN;BL-WOL",
          ]}
          pattern="{country code};{classification}-{sub classification}"
        />
      );

      expect(await screen.findByText("EN")).toBeTruthy();
    });

    it("should allow the user to filter(/)", () => {
      render(
        <DomainFilter
          domains={[
            "US/OK-WOK",
            "FR/NK-WOL",
            "FR/OK-NPP",
            "EN/NK-NRP",
            "EN/BL-WOL",
          ]}
          pattern="{country code}/{classification}-{sub classification}"
        />
      );

      expect(screen.getAllByRole("listbox")).toHaveLength(3);
    });
    it("should render(/)", async () => {
      render(
        <DomainFilter
          domains={[
            "US/OK-WOK",
            "FR/NK-WOL",
            "FR/OK-NPP",
            "EN/NK-NRP",
            "EN/BL-WOL",
          ]}
          pattern="{country code}/{classification}-{sub classification}"
        />
      );

      expect(await screen.findByText("EN")).toBeTruthy();
    });
  });
  describe("Pattern test size", () => {
    it("should allow the user to filter(1)", () => {
      render(
        <DomainFilter
          domains={["US", "FR", "FR", "EN", "EN"]}
          pattern="{country code}"
        />
      );

      expect(screen.getAllByRole("listbox")).toHaveLength(1);
    });
    it("should render(1)", async () => {
      render(
        <DomainFilter
          domains={["US", "FR", "FR", "EN", "EN"]}
          pattern="{country code}"
        />
      );

      expect(await screen.findByText("FR")).toBeTruthy();
    });

    it("should allow the user to filter(4)", () => {
      render(
        <DomainFilter
          domains={[
            "US_OK-WOK;lol",
            "FR_NK-WOL;lol",
            "FR_OK-NPP;lol",
            "EN_NK-NRP;lol",
            "EN_BL-WOL;lol",
          ]}
          pattern="{country code}_{classification}-{sub classification};{cll}"
        />
      );

      expect(screen.getAllByRole("listbox")).toHaveLength(4);
    });
    it("should render", async () => {
      render(
        <DomainFilter
          domains={[
            "US_OK-WOK;lol",
            "FR_NK-WOL;lol",
            "FR_OK-NPP;lol",
            "EN_NK-NRP;lol",
            "EN_BL-WOL;lol",
          ]}
          pattern="{country code}_{classification}-{sub classification};{cll}"
        />
      );

      expect(await screen.findByText("lol")).toBeTruthy();
    });
  });
});
