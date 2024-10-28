import Navbar from "@/components/navigation/navbar";

type AppLayoutProps = Readonly<{children: React.ReactNode}>;

function AppLayout(props: AppLayoutProps) {
	return (
		<>
			<Navbar />
			<main>
				{props.children}
			</main>
		</>
	);
}

export default AppLayout;
