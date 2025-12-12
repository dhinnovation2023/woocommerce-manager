import DashboardLayout from '@/layouts/dashboard'
import { RemixiconComponentType, RiSurveyLine } from '@remixicon/react'
import Link from 'next/link'

interface DashboardGridItemsDataInterface {
  heading: string,
  description: string,
  items: {
    icon: RemixiconComponentType,
    title: string,
    description: string,
    action: {
      text: string,
      url: string,
    }
  }[]
}

const DashboardPage = () => {

  const contentList: DashboardGridItemsDataInterface[] = [
    {
      heading: "Manage WooCommerce",
      description: "Easily track, update, and manage all WooCommerce orders efficiently",
      items: [
        {
          icon: RiSurveyLine,
          title: "Orders",
          description: "Manage Orders",
          action: {
            text: "View Orders",
            url: "/app/woocommerce/orders",
          }
        },
      ]
    }
  ]

  return (
    <DashboardLayout>
      {contentList.map((content, index) => (
        <div
          key={index}
        >
          <h2
            className='text-xl font-extrabold'
          >{content.heading}</h2>
          <p
            className='mb-6 text-foreground-secondary'
          >{content.description}</p>
          <div
            className='grid grid-cols-1 md:grid-cols-4 gap-3'
          >
            {content.items.map((item, index) => (
              <div
                key={index}
                className='bg-background py-6 px-7 space-y-3 rounded-lg shadow-lg shadow-foreground-secondary/5 border border-stroke-light group hover:border-theme-primary'
              >
                <div
                  className='bg-background-secondary p-3 max-w-max rounded-lg group-hover:bg-theme-primary/20 group-hover:text-theme-primary'
                >
                  <item.icon
                    size={20}
                  />
                </div>

                <div>
                  <h3
                    className='text-lg font-bold'
                  >{item.title}</h3>
                  <p>{item.description}</p>
                </div>

                <Link
                  href={item.action.url}
                  className='flex max-w-max py-2 px-3 bg-theme-primary text-white text-sm rounded-lg'
                >{item.action.text}</Link>
              </div>
            ))}
          </div>
        </div>
      ))}
    </DashboardLayout>
  )
}

export default DashboardPage