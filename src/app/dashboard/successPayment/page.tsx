import checkUserSubscription from "@/src/app/api/update-subscription-status/check"

export default function Page() {
    checkUserSubscription(true);
    
    return (
        <h1>Click 'Market Share Chart' to get started :)</h1>
    )
}