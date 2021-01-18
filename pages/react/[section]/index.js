import dynamic from "next/dynamic"
import PageLayout from "components/notebook"
import { sectionProperties, pageContents } from "utils"

const DynamicMarkdownRender = dynamic(() => import("components/markdown-render"), {
    loading: () => <p>Loading..</p>,
})

export const PageLayoutHelper = ({
    codeString,
    notesString,
    section,
    numberOfPages,
    pageId,
    properties,
    hasApp,
}) => (
    <PageLayout
        {...{
            code: <DynamicMarkdownRender children={codeString} />,
            notes: <DynamicMarkdownRender children={notesString} />,
            pageId,
            numberOfPages,
            properties,
            pathname: `/react/${section}`,
            topic: "react",
            section,
            hasApp,
        }}
    />
)

export async function getStaticPaths() {
    return {
        paths: Object.keys(sectionProperties("react")).map(section => ({
            params: { section },
        })),
        fallback: false,
    }
}

export async function getStaticProps({ params }) {
    const { section } = params
    const { numberOfPages, properties } = sectionProperties("react")[section]
    const { notesString, codeString, hasApp } = pageContents("react", section, "1")
    return {
        props: {
            codeString,
            notesString,
            section,
            numberOfPages,
            pageId: "1",
            properties,
            hasApp,
        },
    }
}

const Home = props => <PageLayoutHelper {...props} />

export default Home
