import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import { useContext } from "react";
import { Context } from "../Context/MyContext";

const Faq = () => {
    const {isChecked} = useContext(Context)
  const style = {
    clipPath: "polygon(0 0, 0% 100%, 100% 51%)",
  };
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 bg-white/40 border  rounded-md overflow-hidden ${isChecked ? "!text-white border-white" : "!text-black border-black"}`}>
      <div className="w-full h-full bg-white/40">
        <div className=" py-5 w-full h-full flex flex-col justify-center items-center">
            <h1 className=" text-7xl font-bold">?</h1>
            <h1 className=" text-3xl font-bold">Frequently asked questions</h1>
        </div>
      </div>
      <div>
        <Accordion>

        <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  What Use for Table & Fetch data?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              For table i use react-table. And for data Fetching i use axios and react-query. 
            </AccordionPanel>
          </AccordionItem>

        <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  What Use for Slider?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              For slider i Use splidejs. It is applied on the bottom part of Homepage.
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  What Use for animation?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              For animation i use Frammer motion on some pages, and i use some
              custom Animation. On the details page if you click on image This
              will be full image for this i use React-photo-view.
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  Css library or framework?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Tailwind CSS is a utility-first CSS framework, enabling rapid
              development through pre-defined utility classes. Daisy UI extends
              Tailwind CSS with pre-built components for faster prototyping.
              Chakra UI, a React component library, offers accessible,
              customizable components for building visually appealing interfaces
              efficiently. Tailwind CSS simplifies styling with utility classes,
              while Chakra UI enhances React development with reusable
              components and theming support. Together, they streamline web
              development by providing tools for efficient styling and
              component-based architecture.
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default Faq;
