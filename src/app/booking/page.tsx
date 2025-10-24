"use client";

import React, { useState } from "react";
import styles from "@/styles/Booking.module.scss";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { FaArrowDown } from "react-icons/fa6";

import {useRouter} from "next/navigation";

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
        <p style={{fontStyle: "italic"}}>(If {"you’re"} not a new client and end up cancelling, then for the next session a deposit will be required like the first time)</p>
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
        <ul style={{alignItems: "center"}}>
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
            <span style={{textDecoration: "none", fontStyle: "italic"}}>The deposit counts towards the cancellation fee if you do cancel, which is why {"it's"} necessary for new clients, but if you do cancel due to issues then the deposit can be used towards the next session.</span>
          </li>
          <br />
          <br />
          <p style={{color: "rgb(240, 161, 161)", fontWeight: "bold", textAlign: "center"}}><p style={{fontSize: "1.2rem"}}>{"Want to see why I’m Canada’s #1 provider?"} <span style={{textDecoration: "underline", cursor: "pointer", whiteSpace: "nowrap"}} onClick={() => router.push("/reviews")}>Click here to see my reviews</span></p><span style={{fontSize: "1rem", fontStyle: "italic"}}>{"Try not to fall in love ;)"}</span></p>
        </ul>
      </section>
      <section
        className={styles.deposit}
        style={{ display: openedSection == "2" ? "flex" : "none" }}
      >
        <p>How to do a deposit:</p>
        <ul>
          <li>
            <span>Purchasing my digital art</span> (which you will receive
            through email in minutes), this not only supports my art career
            but also entails the safest way for both of us! This is done in a
            secure, fast, safe way for both parties with{" "}
            <span style={{whiteSpace: "nowrap"}}>e-transfer</span> with these easy steps:
            <br />
            <br />
            1. Add my art to your cart/checkout {"(I’ll send you the website for my art to do this once we confirm a time/day)"}
            <br />
            <br />
            2. Enter your billing information then click place order done! <span style={{color: "rgb(255, 98, 98)"}}>{"Fill out the information then click place order, done! Fast and easy :)"}</span>
            <br />
            <br /> <span>Booking is secured!</span> <br />
            <br />{"I’ll"} get a notification instantly once you checkout and {"you’ll"} receive an email of my digital art along with my information and social media where you can follow my art instagram page which would be lovely if possible {"<3"}
            <br />
            <br />
            I like to be as safe as possible as {"I’m"} new to the country. This method entails safety for both parties as you are paying for digital art which you receive instantly via email. Plus this way I {"don’t"} see your legal name and you {"don’t"} see mine as {"I’ve"} had issues with stalkers seeing my personal name from etransfer in the past. This is done on a reputable website that sells art for new and upcoming artists like me. For the remainder of the payment if {"it's"} safer and easier for you then you can buy more of my art as well. Clients who show up to the session with my artwork as their lockscreen get a sweet treat{";)"}
          </li>
          <li>
            <span>Amazon Gift Card</span>, if the art method {"isn’t"} for you
            then this works as well, this can be done on the Amazon Canada
            website to get a digital code within minutes or a physical card
            bought at stores. Direct link -{" "}
            <a href="https://www.amazon.ca/Amazon-ca-eGift-Card-Amazon-Logo/dp/B07P68FH74/ref=sr_1_3?sr=8-3">
              Amazon.ca eGift Card
            </a><br /> <br />
            <span style={{fontStyle: "italic", textDecoration: "none"}}>Bonus Limited Time Offer: Clients who pay in full for the session with buying my art also get to film the session or pick an extra for <span style={{textDecoration: "underlined"}}>FREE</span> and get my $300 MEGA video package for <span style={{textDecoration: "underlined"}}>FREE</span> (which comes with 6 videos) as {"I’m"} a few sales away to getting my art listed into exhibits!</span>
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
