import {getTails} from "../data/tails";
import styles from "../styles/Tail.module.css"

const Tail = ({ jsonId, tails }) => {
    const tailInfo = tails.find(tail => tail.id === jsonId);

    return (
        <p className={styles.paragraph}>
            <pre className={styles.code}>
                {
                    tailInfo
                        ?
`
{
   "title": "${tailInfo.title}",
   "description": "${tailInfo.description}" 
}
`
                        :
`
{
    "error": "Corresponding tail doesn't exist"
}
`
                }
            </pre>
        </p>
    )
}

export async function getServerSideProps(context) {
    try {
        const res = await fetch(`${process.env.HASURA_HOST}${process.env.HASURA_API_ORIGIN}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `
             query MyQuery($tailName: String!) {
                long_tails(where: {tail: {_similar: $tailName}}) {
                    json_id
                }
            }
            `,
                variables: {
                    tailName: context.params.tail
                },
            }),
        })
        const { data: { long_tails } } = await res.json();
        let jsonId = null;
        if(long_tails.length) {
            jsonId = Number.parseInt(long_tails[0].json_id);
        }
        const tails = await getTails();

        return {
            props: {
                jsonId,
                tails
            },
        }
    } catch (e) {
        console.log(e)
        return {
            props: {
                error: JSON.stringify(e)
            },
        }
    }

}

export default Tail;