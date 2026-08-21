import { link } from "fs";
import { Linkedin } from "lucide-react";

export interface Person {
    id?: number;
    image_source?: string;
    name: string;
    position?: string;
    links?: {
        twitter?: string;
        linkedin?: string;
    };
}

export const people1: Person[] = [
    {
        id: 1,
        image_source:
            "https://res.cloudinary.com/dpp2rltxx/image/upload/v1709131248/csi/team/llgn4s6xwckilkumschq.jpg",
        name: "Prof. (Dr.) Vikram Bali",
        position: "Patron",
        links: {
            linkedin: "",
        },
    },
    {
        id: 2,
        image_source:
            "https://res.cloudinary.com/dpp2rltxx/image/upload/v1709131288/csi/team/ov4sqvmtmkqejhvyufag.png",
        name: "Prof. S.S. Deswal",
        position: "Patron",
        links: {
            linkedin:
                "https://www.linkedin.com/in/prof-dr-satvir-deswal-b94079a",
        },
    },
    {
        id: 3,
        image_source:
            "https://res.cloudinary.com/dpp2rltxx/image/upload/v1709131324/csi/team/bttwzako6b0qhvhm2xmi.jpg",
        name: "Prof. Sachin Gupta",
        position: "Patron",
        links: {
            linkedin: "https://www.linkedin.com/in/drsachingupta",
        },
    },
    {
        id: 4,
        image_source:
            "https://res.cloudinary.com/dpp2rltxx/image/upload/v1709131324/csi/team/zbnwrkews8ahtnavdjcj.jpg",
        name: "Dr. Vinay Kumar Saini",
        position: "Faculty Coordinator",
        links: {
            linkedin: "https://www.linkedin.com/in/vinaykumarsaini",
        },
    },
    {
        id: 5,
        image_source:
            "https://res.cloudinary.com/drt5gi5mx/image/upload/v1722872645/zisr7smueyjxu6nhgkui.jpg",
        name: "Prof. Bhaskar Kapoor",
        position: "Faculty Coordinator",
        links: {
            linkedin: "https://in.linkedin.com/in/dr-bhaskar-kapoor-6b4b7819",
        },
    },
    {
        id: 6,
        image_source:
            "https://res.cloudinary.com/dpp2rltxx/image/upload/v1785186707/csi/team/arun-garg-founder_sbcmbp.webp",
        name: "Mr. Arun Garg",
        position: "Mentor",
        links: {
            linkedin: "https://www.linkedin.com/in/arungargofficial",
        },
    },
];

// CSI_Head_Members_Pics
export const people2: Person[] = [
    {
        id: 1,
        image_source:
            "https://res.cloudinary.com/dpp2rltxx/image/upload/v1785139553/csi/team/Nikhil_Hatwal_hdxuij.jpg",
        name: "Nikhil Hatwal",
        position: "Chairperson",
        links: {
            linkedin: "https://www.linkedin.com/in/nikhil-hatwal-932b952b3/",
        },
    },
    {
        id: 2,
        image_source:
            "https://res.cloudinary.com/dmwkrlwik/image/upload/v1758195769/IMG-20250918-WA0017_nzrgsw_bdafd3.jpg",
        name: "Vidit Kaushik",
        position: "Vice-Chairperson",
        links: {
            linkedin: "https://www.linkedin.com/in/vidit-kaushik-92618b2b5/",
        },
    },
    {
        id: 3,
        image_source:
            "https://res.cloudinary.com/dmwkrlwik/image/upload/v1758196041/Nipun_unu254_b0991d.jpg",
        name: "Nipun Agrawal",
        position: "Treasurer",
        links: {
            linkedin: "https://www.linkedin.com/in/nipun-agrawal-527168266/",
        },
    },
    {
        id: 4,
        image_source:
            "https://res.cloudinary.com/dmwkrlwik/image/upload/v1758195576/Pratham_Gupta_qht7c1.jpg",
        name: "Pratham Gupta",
        position: "Technical Head",
        links: { linkedin: "https://www.linkedin.com/in/prathamgupta006/" },
    },
    {
        id: 5,
        image_source:
            "https://res.cloudinary.com/dpp2rltxx/image/upload/v1785138431/csi/team/Kshitij_Dahiya_rx5hro.jpg",
        name: "Kshitij Dahiya",
        position: "Research Head",
        links: {
            linkedin: "",
        },
    },
    {
        id: 6,
        image_source:
            "https://res.cloudinary.com/dmwkrlwik/image/upload/v1758211274/Screenshot_2025-09-18_213054_f2tkwy.png",
        name: "Shubham Jha",
        position: "Content Head",
        links: {
            linkedin: "https://www.linkedin.com/in/shubham-jha-a37a49263/",
        },
    },
    {
        id: 7,
        image_source:
            "https://res.cloudinary.com/dmwkrlwik/image/upload/v1758197130/Dhruv_ypi5cm_a9a469.jpg",
        name: "Dhruv Mehra",
        position: "Event Management Head",
        links: {
            linkedin: "https://www.linkedin.com/in/dhruv-mehra-1b2742315/",
        },
    },
    {
        id: 8,
        image_source:
            "https://res.cloudinary.com/dmwkrlwik/image/upload/v1758197164/Bhumi_t7ltp9_3e033e.webp",
        name: "Bhumi Rajbhar",
        position: "Social Media Co-Head",
        links: {
            linkedin: "https://www.linkedin.com/in/bhumi-rajbhar-292633291/",
        },
    },
    {
        id: 9,
        image_source:
            "https://res.cloudinary.com/dmwkrlwik/image/upload/v1758197212/liesha_gupta_pryso1_0ac19b.jpg",
        name: "Liesha Gupta",
        position: "Social Media Co-Head",
        links: {
            linkedin: "https://www.linkedin.com/in/liesha-gupta/",
        },
    },
    {
        id: 10,
        image_source:
            "https://res.cloudinary.com/dmwkrlwik/image/upload/v1758196144/Ashwani_2_mn8spt_a066d0.jpg",
        name: "Ashwani Kumar",
        position: "Logistics and Hospitality Co-Head",
        links: {
            linkedin: "https://www.linkedin.com/in/ashwani-kumar-21568b201/",
        },
    },
    {
        id: 11,
        image_source:
            "https://res.cloudinary.com/dmwkrlwik/image/upload/v1758197321/IMG-20250910-WA0068_zarlo6_be3469.jpg",
        name: "Parthsaarthie Sharma",
        position: "Logistics and Hospitality Co-Head",
        links: {
            linkedin: "https://www.linkedin.com/in/parthsaarthie-sharma/",
        },
    },
    {
        id: 12,
        image_source:
            "https://res.cloudinary.com/dmwkrlwik/image/upload/v1758197265/lakshay_g3rfnf_2bd269.jpg",
        name: "Lakshay Gupta",
        position: "Photography Head",
        links: {
            linkedin: "https://www.linkedin.com/in/lakshay-gupta-b189b0287/",
        },
    },
    {
        id: 13,
        image_source:
            "https://res.cloudinary.com/dmwkrlwik/image/upload/v1758196524/Naveen_edited_damfmh.jpg",
        name: "Naveen Verma",
        position: "Data Head",
        links: {
            linkedin: "https://www.linkedin.com/in/naveen-verma-396b93276/",
        },
    },
];

// CSI_Advisors_Pics
export const people3: Person[] = [

    {
        id: 2,
        image_source:
            "https://res.cloudinary.com/drt5gi5mx/image/upload/v1722871017/Vidhi_Jain-fotor-20240805204258_f1s3wi.jpg",
        name: "Vidhi Jain",
        position: "Advisor",
        links: {
            linkedin: "https://www.linkedin.com/in/vidhi-jain-vee27032004/",
        },
    },
    {
        id: 3,
        image_source:
            "https://res.cloudinary.com/dpp2rltxx/image/upload/v1785167884/csi/team/Saksham_Aggarwal.jpg",
        name: "Saksham Aggarwal",
        position: "Advisor",
        links: {
            linkedin: "",
        },
    }
];

export interface Department {
    name: string;
    leads: Person[];
    people: Person[];
}

export const executivesData: Department[] = [
    {
        name: "Research Team",
        leads: [
            {
                name: "Kshitij Dahiya",
                image_source: "https://res.cloudinary.com/dpp2rltxx/image/upload/v1785138431/csi/team/Kshitij_Dahiya_rx5hro.jpg",
                links: { linkedin: "" },
            },
            {
                name: "Joyal Jijo",
                links: { linkedin: "https://www.linkedin.com/in/joyal-jijo/" },
            },
        ],
        people: [
            {
                name: "Aryan Kaushik",
                links: { linkedin: "" },
            },
            {
                name: "Saloni",
                links: { linkedin: "" },
            },
            {
                name: "Utkarsh Singh",
                links: { linkedin: "" },
            },
            {
                name: "Raaghav Kapoor",
                links: { linkedin: "" },
            },
            {
                name: "Kartik Tiwari",
                links: { linkedin: "" },
            },
        ],
    },
    {
        name: "Technical Team",
        leads: [
            {
                name: "Pratham Gupta",
                links: { linkedin: "https://www.linkedin.com/in/prathamgupta006/" },
            },
        ],
        people: [
            {
                name: "Kalash Maheshwari",
                links: { linkedin: "https://www.linkedin.com/in/kalash-maheshwari-7143b0372/" },
            },
            {
                name: "Akshit Malia",
                links: { linkedin: "https://www.linkedin.com/in/akshit-malia-6b35b0256/" },
            },
            {
                name: "Dakshata Mishra",
                links: { linkedin: "" },
            },
            {
                name: "Chirag Rajput",
                links: { linkedin: "https://www.linkedin.com/in/chirag-rajput-8b31602bb/" },
            },
            {
                name: "Ashi",
                links: { linkedin: "" },
            },
            {
                name: "Vandit",
                links: { linkedin: "" },
            },
            {
                name: "Aditya Saini",
                links: { linkedin: "" },
            },
            {
                name: "Krish taank",
                links: { linkedin: "" },
            },
            {
                name: "Som Kashyap",
                links: { linkedin: "" },
            },
            {
                name: "Arpit Tiwari",
                links: { linkedin: "" },
            },
        ],
    },
    {
        name: "Event Management Executives",
        leads: [
            {
                name: "Dhruv Mehra",
                links: { linkedin: "https://www.linkedin.com/in/dhruv-mehra-1b2742315/" },
            },
        ],
        people: [
            {
                name: "Sidhant Malik",
                links: { linkedin: "" },
            },
            {
                name: "Yatin Kumar",
                links: { linkedin: "" },
            },
            {
                name: "Hansika Gupta",
                links: { linkedin: "" },
            },
            {
                name: "Krish Mittal",
                links: { linkedin: "" },
            },
            {
                name: "Shubham nagpal",
                links: { linkedin: "" },
            },
            {
                name: "Anshita",
                links: { linkedin: "" },
            },
            {
                name: "Gautam mishra",
                links: { linkedin: "" },
            },
            {
                name: "Dhruv aiyyar",
                links: { linkedin: "" },
            },
            {
                name: "Ayush Jhingan",
                links: { linkedin: "" },
            },
            {
                name: "Varun Kumar Singh",
                links: { linkedin: "" },
            },
            {
                name: "Rishabh Sharma",
                links: { linkedin: "" },
            },
            {
                name: "Akshay",
                links: { linkedin: "" },
            },
            {
                name: "Siddharth Pandey",
                links: { linkedin: "" },
            },
            {
                name: "Krish Vishwakarma",
                links: { linkedin: "" },
            },
        ],
    },
    {
        name: "Public Relations Executives",
        leads: [
        ],
        people: [
            {
                name: "HARSHIT",
                links: { linkedin: "" },
            },
            {
                name: "Yashmit Kamal",
                links: { linkedin: "" },
            },
            {
                name: "Hemant",
                links: { linkedin: "" },
            },
            {
                name: "Sarthak Kohli",
                links: { linkedin: "" },
            },
            {
                name: "Kashvi garg",
                links: { linkedin: "" },
            },
            {
                name: "Ashish Omm",
                links: { linkedin: "" },
            },
            {
                name: "Kanishka Upadhyay",
                links: { linkedin: "" },
            },
            {
                name: "Atharv sharma",
                links: { linkedin: "" },
            },
            {
                name: "Samrat sharma",
                links: { linkedin: "" },
            },
            {
                name: "Kashish Rohatgi",
                links: { linkedin: "" },
            },
            {
                name: "Mridul",
                links: { linkedin: "" },
            },
        ],
    },
    {
        name: "Social Media and Photography Executives",
        leads: [
            {
                name: "Bhumi Rajbhar",
                links: { linkedin: "https://www.linkedin.com/in/bhumi-rajbhar-292633291/" },
            },
            {
                name: "Liesha Gupta",
                links: { linkedin: "https://www.linkedin.com/in/liesha-gupta/" },
            },
            {
                name: "Lakshay Gupta",
                links: { linkedin: "https://www.linkedin.com/in/lakshay-gupta-b189b0287/" },
            },
        ],
        people: [
            {
                name: "Reva Verma",
                links: { linkedin: "" },
            },
            {
                name: "Lakshay jain",
                links: { linkedin: "" },
            },
            {
                name: "Somya",
                links: { linkedin: "" },
            },
            {
                name: "Ayush Pathak",
                links: { linkedin: "" },
            },
            {
                name: "Kshitij",
                links: { linkedin: "" },
            },
            {
                name: "Annanya Pandey",
                links: { linkedin: "" },
            },
            {
                name: "Lakshya Mehta",
                links: { linkedin: "" },
            },
            {
                name: "Ashutosh",
                links: { linkedin: "" },
            },
            {
                name: "Arnav Kashyap",
                links: { linkedin: "" },
            },
            {
                name: "Manan Goel",
                links: { linkedin: "" },
            },
            {
                name: "Dhruv Gupta",
                links: { linkedin: "" },
            },
            {
                name: "Ekamjot Singh",
                links: { linkedin: "" },
            },
        ],
    },
    {
        name: "Content Executives",
        leads: [
            {
                name: "Shubham Jha",
                links: { linkedin: "https://www.linkedin.com/in/shubham-jha-a37a49263/" },
            },
        ],
        people: [
            {
                name: "Aarav Singh",
                links: { linkedin: "" },
            },
            {
                name: "Suhani Gupta",
                links: { linkedin: "" },
            },
            {
                name: "Aryan Maurya",
                links: { linkedin: "" },
            },
            {
                name: "Richa Garg",
                links: { linkedin: "" },
            },
            {
                name: "Krish Anand",
                links: { linkedin: "" },
            },
            {
                name: "Shivangi sharma",
                links: { linkedin: "" },
            },
            {
                name: "Roshan kumar",
                links: { linkedin: "" },
            },
            {
                name: "Raj",
                links: { linkedin: "" },
            },
            {
                name: "Saurabh singh",
                links: { linkedin: "" },
            },
            {
                name: "Supriya Pushkar",
                links: { linkedin: "" },
            },
        ],
    },
    {
        name: "Logistics and Hospitality Executives",
        leads: [
            {
                name: "Parthsaarthie Sharma",
                links: { linkedin: "https://www.linkedin.com/in/parthsaarthie-sharma/" },
            },
            {
                name: "Ashwani Kumar",
                links: { linkedin: "https://www.linkedin.com/in/ashwani-kumar-21568b201/" },
            },
        ],
        people: [
            {
                name: "Prathak gupta",
                links: { linkedin: "" },
            },
            {
                name: "Mayank",
                links: { linkedin: "" },
            },
            {
                name: "Rishabh Raj",
                links: { linkedin: "" },
            },
            {
                name: "Devansh goyal",
                links: { linkedin: "" },
            },
            {
                name: "Rishab Bansal",
                links: { linkedin: "" },
            },
            {
                name: "Jay Sharma",
                links: { linkedin: "" },
            },
            {
                name: "Prithvi singh",
                links: { linkedin: "" },
            },
            {
                name: "PRINCE SANCHETI",
                links: { linkedin: "" },
            },
        ],
    },
];

export default executivesData;
