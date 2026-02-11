import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./carousel";
import { Button } from "./button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobslice";


const category = [
  "Frontend developer",
  "Backend developer",
  "Fullstack developer",
  "Graphic designer",
  "Data analyst",
];

const categoryCarousel = () => {

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const searchJobHandler = (query) => {
  
      dispatch(setSearchedQuery(query));
      navigate("/browse")
  
    }
  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-20">
        <CarouselContent>
          {category.map((cat, index) => (
            <CarouselItem key={cat} className="md:basis-1/2 lg:basis-1/3">
              {" "}
              <Button onClick={() => searchJobHandler(cat)} variant="outline" className="rounded-full cursor-pointer">
                {cat}
              </Button>{" "}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default categoryCarousel;
