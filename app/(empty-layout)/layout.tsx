type EmptyLayoutProps = Readonly<{children: React.ReactNode}>;

function EmptyLayout(props: EmptyLayoutProps) {
	return (
		<main>
			{props.children}
		</main>
	);
}

export default EmptyLayout;
