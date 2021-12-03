import styles from "../styles/Tail.module.css"
import {fetchJsonId} from "../helpers/fetch-json-id";
import {fetchTailsJson} from "../helpers/fetch-tails-json";

const getErrorMessage = (e) => (
`
{
    "error": "Corresponding tail doesn't exist",
    "reason": ${e}
}
`
);

const getTailInfoMessage = (title, desc) => (
`
{
   "title": "${title}",
   "description": "${desc}" 
}
`
)

const Tail = ({ jsonId, res, tails, error }) => {
    const tailInfo = tails?.find(tail => tail.id === jsonId);
    console.log(tails);
    console.log(`json_id: ${jsonId}`);
    console.log(res);
    return (
        <p className='paragraph'>
            <pre className={styles.code}>
                {
                    tailInfo
                        ? getTailInfoMessage(tailInfo.title, tailInfo.description)
                        : getErrorMessage(error)
                }
            </pre>
        </p>
    )
}

const parseResponseData = async (res) => {
    try {
        const { data: { long_tails } } = await res.json();
        if(long_tails.length) {
            return Number.parseInt(long_tails[0].json_id);
        } else {
            return null;
        }
    } catch (e) {
        throw e;
    }

}

export async function getServerSideProps(context) {
    try {
        const res = await fetchJsonId(context.params.tail)
        const jsonId = await parseResponseData(res);
        const tails = await fetchTailsJson();

        return {
            props: {
                jsonId,
                res,
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
