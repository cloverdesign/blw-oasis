import Image, { StaticImageData } from "next/image"
import leader from "@/public/hero.png"

export const Leadership = () => {
    type Leader = {
        name: string
        role: string
        about: string
        image?: StaticImageData
    }

    const leaders: Leader[] = [
        { name: "Pastor Deji Olubusi", role: "Regional Secretary", about: "", image: leader },
        { name: "Pastor Iris Akanji", role: "Zonal Pastor", about: "", image: leader },
        {
            name: "Pastor Debbie Onyibe",
            role: "Group Pastor & Lead, Global Missions & Media",
            about: "I currently serve as the Group Pastor of Oasis Vanguards which is headquartered in Georgia. I also lead two of the most awesome teams at Oasis; Global Missions & Media, where I help shape the systems, teams, and strategies that drive our soul-winning work across campuses. I'm passionate about raising sharp, confident, Spirit-filled leaders who know their identity in Christ and are bold enough to change their world. My focus is simple: win souls, strengthen leaders, and create excellence everywhere we plant our feet.",
            // image: leader,
        },
        {
            name: "Pastor Ruky Akpoghiran",
            role: "Group Pastor & PFCC Lead",
            about: "I serve as the Group Pastor of BLW Oasis Mega which is headquartered in New York, and the Head of the Pastoral Care Fellowship Coordinating Center. I'm inspired to win souls and see people encounter God for themselves, walk in their identity, and live out their lives in Christ. I'm also deeply passionate about raising leaders who fulfill God's dream for their lives.",
            // image: leader,
        },
        {
            name: "Pastor Joshua Adewolu",
            role: "Group Pastor",
            about: "I currently serve as the Group Pastor of BLW Oasis Trailblazers, which is headquartered in Massachusetts. I'm also an Engineering fellow who is passionate about mentoring young people to fulfill all of their God-given potential.",
            image: leader,
        },
        { name: "Pastor Gradieu Kisala", role: "Group Pastor", about: "", image: leader },
        { name: "Pastor Kome Igbogidi", role: "Group Pastor & Finance Lead", about: "", image: leader },
        { name: "Pastor Stephen Aisedu", role: "Pastor, Oasis Missions", about: "", image: leader },
    ]

    return (
        <section className="flex flex-col items-center gap-10 lg:gap-20  px-4 lg:px-8 mt-[144px]">
            <h2 className="font-heading text-4xl capitalize lg:text-6xl text-center">
                Meet Our <br /> Leadership.
            </h2>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {leaders.map((leader) => (
                    <LeadershipCard
                        key={leader.name}
                        name={leader.name}
                        title={leader.role}
                        image={leader.image}
                        about={leader.about}
                    />
                ))}
            </div>
        </section>
    )
}

const LeadershipCard = ({
    name,
    title,
    image,
    about,
}: {
    name: string
    title: string
    image?: StaticImageData
    about?: string
}) => {
    return (
        <div className="bg-primary p-2 rounded-2xl flex flex-col justify-end gap-4 min-h-[500px] relative"
            style={{
                backgroundImage: `url(${image?.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <div className="bg-background text-foreground p-5 rounded-2xl w-fit">
                <h3 className="font-heading text-lg font-semibold">{name}</h3>
                <p className="text-sm">{title}</p>
            </div>

            {!image && <svg xmlns="http://www.w3.org/2000/svg" width="63" height="76" viewBox="0 0 63 76" fill="none" className="absolute top-[50%] -translate-y-1/2 left-1/2 -translate-x-1/2">
                <g clip-path="url(#clip0_37_2423)">
                    <path d="M29.0722 72.9103C41.8693 72.9924 61.155 53.0545 53.9116 33.4078C51.6229 27.2061 45.5648 24.0192 39.113 25.2784C34.6627 26.1479 30.6883 28.5597 28.7441 32.9279C26.5867 28.7155 22.928 25.9552 18.8469 25.1389C14.0727 24.1874 9.5814 25.7009 6.09504 28.896C2.32976 32.3455 0.76705 37.0992 -0.0778809 42.0088C0.192825 26.5663 9.86031 13.0515 25.8525 11.9482C41.0776 10.8982 54.5227 20.8856 58.247 35.6226C57.7753 26.5294 52.9272 18.5353 45.8847 13.1828C36.9022 6.35768 25.6269 4.72114 14.774 8.43309C25.7992 0.447262 41.0038 2.05919 50.6057 11.5257C65.1295 25.8485 65.7857 50.0808 51.9428 65.4003C47.8125 69.9695 42.7306 73.3 36.6561 74.469C26.0288 76.5157 14.9873 72.3115 8.37553 63.9524C2.98192 57.1397 3.55204 47.7183 9.95875 41.9678C13.3754 38.9039 18.404 38.6742 22.161 41.1311C25.5079 43.3214 27.2101 47.2015 26.1765 51.1349C24.3267 48.8995 21.7427 48.1613 19.1135 48.756C16.4844 49.3507 14.651 51.463 13.9947 54.285C11.8865 63.3003 19.9462 72.8447 29.0722 72.9062V72.9103ZM22.8378 44.2524C22.2185 42.8333 20.8403 41.8202 19.2079 41.3731C14.9053 40.1918 10.0572 42.2426 8.42885 46.5657C12.4566 42.8538 17.8954 42.017 22.8378 44.2524Z" fill="#4CB1FE" />
                    <path d="M23.6909 70.4945C18.043 67.9023 14.1629 60.6875 16.8987 55.1052C17.637 53.5959 19.0069 52.4597 20.4096 52.2013C22.0585 51.8978 23.6663 52.755 24.8107 53.8912C22.28 54.3505 20.5942 55.8189 20.0446 58.1773C18.9987 62.6522 20.705 66.9712 23.6909 70.4986V70.4945Z" fill="#4CB1FE" />
                </g>
                <defs>
                    <clipPath id="clip0_37_2423">
                        <rect width="62.3444" height="75.0594" fill="white" />
                    </clipPath>
                </defs>
            </svg>}
        </div>
    )
}