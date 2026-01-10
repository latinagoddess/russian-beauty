"use client";

import React, { useState } from "react";
import styles from "@/styles/Booking.module.scss";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { FaArrowDown, FaStar } from "react-icons/fa6";

import { useRouter } from "next/navigation";

function Booking() {
  const router = useRouter();
  const [openedSection, setOpenedSection] = useState("1");

  const handleChange = (event: SelectChangeEvent) => {
    setOpenedSection(event.target.value as string);
  };

  return (
    <main className={styles.booking}>
      <h1>Booking Procedure</h1>
      <p>
        Due to my limited availability, I do require a deposit for first time
        clients from the two options mentioned below. Same day bookings is{" "}
        <span>45% deposit</span> and anything 24 hours/day after is{" "}
        <span>35%.</span> The deposit is deducted from the total price{" "}
        {"you’re"} seeing me for. <span>No deposit = no booking.</span>
        <br />
        <br />
        <p style={{ fontStyle: "italic" }}>(If {"you’re"} not a new client and end up cancelling, then for the next session a deposit will be required like the first time)</p>
        <br />
        <br />
        <em>
          24 hour notice is recommended and ideal for me as I see only limited
          clients weekly and am very occupied with art school but I understand
          those last second urges which is why same day booking is 10% higher so
          I can guarantee your spot and fix it with my schedule accordingly.
        </em>
      </p>

      <section className={styles.bookingGuide}>
        <span>To Book You MUST Read The 3 Things in This Dropdown Menu</span>
        <FaArrowDown />
      </section>

      <FormControl>
        <Select
          id="demo-simple-select"
          defaultValue={openedSection}
          value={openedSection}
          onChange={handleChange}
        >
          <MenuItem value={"1"}>Why is a deposit required?</MenuItem>
          <MenuItem value={"2"}>How to do a deposit?</MenuItem>
          <MenuItem value={"3"}>Etiquette/Rules</MenuItem>
        </Select>
      </FormControl>

      <section
        className={styles.why}
        style={{ display: openedSection == "1" ? "flex" : "none" }}
      >
        <p>Why is a deposit required?</p>
        <ul style={{ alignItems: "center" }}>
          <li>
            <span>Wasting time</span>: As this is pretty straightforward there
            are many people who waste time for people like us, I put a lot of
            effort to look my best and feel my best physically and mentally for
            every session to give everyone the best experience.
          </li>
          <li>
            <span>Safety</span>: As {"I’d"} assume ur aware, there are many
            shady people on websites such as where you found me. With a deposit
            it gives more assurance {"you’re"} less likely to threaten, abuse,
            stalk, or have other negative intentions
          </li>
          <li>
            <span>Booking</span>:{" "}
            {
              "I’m a low volume provider and occupied with art school so it’s essential to "
            }
            {
              "book to secure a spot so I don’t book anyone else within that timespan "
            }
            {"you’re wishing to see me for/make plans for myself."}
            <br />
            <br />
            <span style={{ textDecoration: "none", fontStyle: "italic" }}>The deposit counts towards the cancellation fee if you do cancel, which is why {"it's"} necessary for new clients, but if you do cancel due to issues then the deposit can be used towards the next session.</span>
          </li>
          <br />
          <br />
          <p style={{ color: "rgb(240, 161, 161)", fontWeight: "bold", textAlign: "center" }}><p style={{ fontSize: "1.2rem" }}>{"Want to see why I’m Canada’s #1 provider?"} <span style={{ textDecoration: "underline", cursor: "pointer", whiteSpace: "nowrap" }} onClick={() => router.push("/reviews")}>Click here to see my reviews</span></p><span style={{ fontSize: "1rem", fontStyle: "italic" }}>{"Try not to fall in love ;)"}</span></p>
        </ul>
      </section>
      <section
        className={styles.deposit}
        style={{ display: openedSection == "2" ? "flex" : "none" }}
      >
        <p>How to do a deposit:</p>
        <ul>
          <li>
            Purchasing my online books this not only supports my career but also entails the safest
            way for both of us! This is done in a secure, fast, safe way for both parties with e-transfer
            or prepaid visa {":)"}
            <br />
            <br />
            Once we confirm the time / appointment {"you’re wanting I’ll"} forward you the information
            for the etransfer info to securely checkout with my online ebooks which you receive
            instantly!
            <br />
            <br />
            Clients who show up to the session who can let me know their favourite character do get
            a little bonus surprise {":)"}
          </li>
          <li>
            <span>Amazon Gift Card</span>, if the art method {"isn’t"} for you
            then this works as well, this can be done on the Amazon Canada
            website to get a digital code within minutes or a physical card
            bought at stores. Direct link -{" "}
            <a href="https://www.amazon.ca/Amazon-ca-eGift-Card-Amazon-Logo/dp/B07P68FH74/ref=sr_1_3?sr=8-3">
              Amazon.ca eGift Card
            </a><br /> <br />
            <a href="https://www.amazon.ca/Amazon-ca-eGift-Card-Amazon-Logo/dp/B07P68FH74/ref=sr_1_3?sr=8-3">
              Amazon.ca eGift Card
            </a><br /> <br />

            <div className={styles.limitedOffer}>
              <FaStar className={styles.starIcon} />
              <p>
                Bonus Limited Time Offer: Clients who pay in full for the session with buying ebooks get to film the session or pick 2 extras for <span>FREE</span> and get my $300 MEGA video package for <span>FREE</span> (which comes with 6 videos) as {"I’m"} getting closer to hitting my goal {":)"}
              </p>
            </div>
          </li>
        </ul>
      </section>
      <section
        className={styles.rules}
        style={{ display: openedSection == "3" ? "flex" : "none" }}
      >
        <p>Etiquette/Rules:</p>
        <ul>
          <li>
            <span>Hygiene</span>: As I maintain high standards of personal
            hygiene I expect the same from any clients. (I have a shower at my
            incall if needed)
          </li>
          <li>
            <span>Confidentiality</span>: Any information you share with me is
            strictly confidential. Please respect my privacy in return.
          </li>
          <li>
            <span>Deposit</span>: as mentioned above is required for first time
            clients
          </li>
          <li>
            <span>Donation</span>: At the start of the session please place it
            an unsealed envelope or neatly on the counter
          </li>
        </ul>
      </section>
    </main>
  );
}

export default Booking;
