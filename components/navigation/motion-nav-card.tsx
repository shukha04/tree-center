"use client";

import {Card} from "@/components/ui/card";
import {NavigationMenuProps} from "@radix-ui/react-navigation-menu";
import {motion, MotionProps} from "framer-motion";

type MotionNavCardProps = {} & MotionProps & NavigationMenuProps;

const MNavCard = motion.create(Card)

function MotionNavCard(props: MotionNavCardProps) {
	return (
		<MNavCard {...props}>
			{props.children}
		</MNavCard>
	);
}

export default MotionNavCard;
