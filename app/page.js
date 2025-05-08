"use client";

import { useState, useEffect } from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";

// Initialize Apollo Client
const client = new ApolloClient({
  uri: "https://astralpaints.kwebmakerdigitalagency.com/graphql",
  cache: new InMemoryCache(),
});

// GraphQL Query (adjusted to match the provided query but renamed fields to match SSA context)
const HOMEPAGE_QUERY = gql`
  {
    pages(where: { name: "Homepage" }) {
      nodes {
        homepage {
          banners {
            bannerImage {
              node {
                sourceUrl
              }
            }
            bannersTitle
            bannerDescription
            bannerButton {
              title
              url
              target
            }
          }
          homeAboutTitle
          homeAboutSubtitle
          homeAboutDescription
          homeAboutButton {
            title
            url
            target
          }
          homeAboutVideoImage {
            node {
              sourceUrl
            }
          }
          homeAboutVideoUrl
          homeCategoryTitle
          homeCategorySubtitle
          homeServicesTitle
          homeServicesSubtitle
          homeColoursTitle
          homeColoursSubtitle
          homeColoursButton {
            title
            url
            target
          }
          homeJoinTitle
          homeJoinSubtitle
          homeJoinDescription
          homeJoinButton {
            title
            url
            target
          }
          homeJoinBackgroundImage {
            node {
              sourceUrl
            }
          }
          blogTitle
          blogSubtitle
          categories {
            link
            title
            image {
              node {
                sourceUrl
              }
            }
          }
        }
        seo {
          title
          metaDesc
          metaKeywords
        }
      }
    }
    allColourCategory(where: { slug: "popular" }) {
      nodes {
        name
        colours {
          nodes {
            title
            colourInfo {
              selectColor
              colourRgb
            }
          }
        }
      }
    }
    blogs {
      nodes {
        featuredImage {
          node {
            sourceUrl
          }
        }
        slug
        title
        date
      }
    }
  }
`;

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [currentAmenityIndex, setCurrentAmenityIndex] = useState(0);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await client.query({ query: HOMEPAGE_QUERY });
        setData(result.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data?.pages?.nodes[0]?.homepage?.banners?.length > 1) {
      const interval = setInterval(() => {
        setCurrentBannerIndex(
          (prevIndex) =>
            (prevIndex + 1) % data.pages.nodes[0].homepage.banners.length
        );
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [data]);

  useEffect(() => {
    if (data?.pages?.nodes[0]?.homepage?.categories?.length > 1) {
      const interval = setInterval(() => {
        setCurrentAmenityIndex(
          (prevIndex) =>
            (prevIndex + 1) % data.pages.nodes[0].homepage.categories.length
        );
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [data]);

  useEffect(() => {
    if (data?.pages?.nodes[0]?.homepage?.categories?.length > 1) {
      const interval = setInterval(() => {
        setCurrentEventIndex(
          (prevIndex) =>
            (prevIndex + 1) % data.pages.nodes[0].homepage.categories.length
        );
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [data]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-600"></div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600 text-xl">{error}</div>
      </div>
    );

  if (!data) return null;

  const { pages, allColourCategory, blogs } = data;
  const homepage = pages.nodes[0]?.homepage;
  const seo = pages.nodes[0]?.seo;
  const colors = allColourCategory.nodes[0]?.colours.nodes;
  const blogPosts = blogs.nodes;
  const banners = homepage?.banners || [];
  const currentBanner = banners[currentBannerIndex];
  const amenities = homepage?.categories || [];
  const currentAmenity = amenities[currentAmenityIndex];
  const events = homepage?.categories || [];
  const currentEvent = events[currentEventIndex];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Image
                src="/ssa-logo.jpg"
                alt="SSA Logo"
                width={50}
                height={50}
              />
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link
                href="/about"
                className="text-gray-700 hover:text-green-600"
              >
                About Us
              </Link>
              <Link
                href="/matches"
                className="text-gray-700 hover:text-green-600"
              >
                Matches
              </Link>
              <Link
                href="/programs"
                className="text-gray-700 hover:text-green-600"
              >
                Programs
              </Link>
              <Link
                href="/coaches"
                className="text-gray-700 hover:text-green-600"
              >
                Coaches
              </Link>
              <Link
                href="/amenities"
                className="text-gray-700 hover:text-green-600"
              >
                Amenities
              </Link>
              <Link
                href="/events"
                className="text-gray-700 hover:text-green-600"
              >
                Events
              </Link>
              <Link href="/news" className="text-gray-700 hover:text-green-600">
                News
              </Link>
              <Link
                href="/blogs"
                className="text-gray-700 hover:text-green-600"
              >
                Blogs
              </Link>
              <Link href="/faq" className="text-gray-700 hover:text-green-600">
                FAQ
              </Link>
            </nav>
            <Link
              href="/contact"
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </header>

      {/* Banner Section */}
      <section className="relative">
        {banners.length > 0 && (
          <div className="relative h-screen">
            <Image
              src={currentBanner.bannerImage.node.sourceUrl}
              alt={currentBanner.bannersTitle}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="text-center text-white px-4 max-w-4xl">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  {currentBanner.bannersTitle}
                </h1>
                <p className="text-lg md:text-xl mb-8">
                  {currentBanner.bannerDescription}
                </p>
                <Link
                  href={currentBanner.bannerButton.url}
                  target={currentBanner.bannerButton.target}
                  className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700"
                >
                  {currentBanner.bannerButton.title}
                </Link>
              </div>
            </div>
            {banners.length > 1 && (
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {banners.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentBannerIndex(index)}
                    className={`w-3 h-3 rounded-full ${
                      currentBannerIndex === index ? "bg-white" : "bg-gray-400"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </section>

      {/* About Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">
            {homepage?.homeAboutTitle}
          </h2>
          <p className="text-gray-600 mt-4 text-lg">
            {homepage?.homeAboutSubtitle}
          </p>
        </div>
        <div className="mt-8 flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2 relative rounded-lg overflow-hidden shadow-xl">
            <Image
              src={homepage?.homeAboutVideoImage.node.sourceUrl}
              alt="About SSA"
              width={600}
              height={400}
              className="w-full h-auto object-cover rounded-lg"
            />
            {homepage?.homeAboutVideoUrl && (
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-16 h-16 bg-white bg-opacity-80 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-8 h-8 text-green-600 ml-1"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </div>
            )}
          </div>
          <div className="md:w-1/2">
            <p className="text-gray-700 text-lg mb-6">
              {homepage?.homeAboutDescription}
            </p>
            <Link
              href={homepage?.homeAboutButton.url}
              target={homepage?.homeAboutButton.target}
              className="inline-block text-green-600 hover:text-green-700 flex items-center"
            >
              {homepage?.homeAboutButton.title}
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold">
              {homepage?.homeServicesTitle}
            </h2>
            <p className="text-gray-600 mt-4 text-lg">
              {homepage?.homeServicesSubtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {amenities.length > 0 && (
              <div className="relative rounded-lg overflow-hidden shadow-xl">
                <Image
                  src={currentAmenity.image.node.sourceUrl}
                  alt={currentAmenity.title}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover rounded-lg"
                  sizes="100vw"
                />
                {amenities.length > 1 && (
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {amenities.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentAmenityIndex(index)}
                        className={`w-3 h-3 rounded-full ${
                          currentAmenityIndex === index
                            ? "bg-black"
                            : "bg-gray-400"
                        }`}
                        aria-label={`Go to amenity ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
            <div>
              <div className="flex flex-wrap gap-4 mb-6">
                {amenities.map((category) => (
                  <button
                    key={category.title}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                  >
                    {category.title}
                  </button>
                ))}
              </div>
              <p className="text-gray-700 text-lg mb-6">
                {homepage?.homeServicesSubtitle}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold">
              {homepage?.homeColoursTitle}
            </h2>
            <p className="text-gray-600 mt-4 text-lg">
              {homepage?.homeColoursSubtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-700 text-lg mb-6">
                {homepage?.homeColoursSubtitle}
              </p>
              <Link
                href={homepage?.homeColoursButton.url}
                target={homepage?.homeColoursButton.target}
                className="inline-block text-green-600 hover:text-green-700 flex items-center"
              >
                {homepage?.homeColoursButton.title}
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
            {events.length > 0 && (
              <div className="relative rounded-lg overflow-hidden shadow-xl">
                <Image
                  src={currentEvent.image.node.sourceUrl}
                  alt={currentEvent.title}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover rounded-lg"
                  sizes="100vw"
                />
                {events.length > 1 && (
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {events.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentEventIndex(index)}
                        className={`w-3 h-3 rounded-full ${
                          currentEventIndex === index
                            ? "bg-black"
                            : "bg-gray-400"
                        }`}
                        aria-label={`Go to event ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold">
              {homepage?.homeCategoryTitle}
            </h2>
            <p className="text-gray-600 mt-4 text-lg">
              {homepage?.homeCategorySubtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {homepage?.categories.map((category, index) => (
              <Link key={index} href={category.link} className="block group">
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl">
                  <div className="relative h-60">
                    <Image
                      src={category.image.node.sourceUrl}
                      alt={category.title}
                      fill
                      className="object-cover group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold">{category.title}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Blogs Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold">
              {homepage?.blogTitle}
            </h2>
            <p className="text-gray-600 mt-4 text-lg">
              {homepage?.blogSubtitle}
            </p>
            <Link
              href="/blogs"
              className="inline-block text-green-600 hover:text-green-700 flex items-center justify-center"
            >
              View All
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts?.slice(0, 3).map((post, index) => (
              <Link
                key={index}
                href={`/blog/${post.slug}`}
                className="block group"
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl">
                  <div className="relative h-56">
                    <Image
                      src={
                        post.featuredImage?.node?.sourceUrl ||
                        "/placeholder-image.jpg"
                      }
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold group-hover:text-green-600">
                      {post.title}
                    </h3>
                    <p className="text-gray-500 text-sm mt-2">
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 px-4 border-t">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Image src="/ssa-logo.png" alt="SSA Logo" width={50} height={50} />
            <p className="text-gray-700 mt-4">Sign Slam Academy</p>
            <p className="text-gray-700">30 Wills Hill Road, Lovedale, NSW</p>
            <p className="text-gray-700 mt-2 flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              61 19242589752
            </p>
            <p className="text-gray-700 mt-2 flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              info@ssagroup.com
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-gray-700 hover:text-green-600"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/coaches"
                  className="text-gray-700 hover:text-green-600"
                >
                  Coaches
                </Link>
              </li>
              <li>
                <Link
                  href="/news"
                  className="text-gray-700 hover:text-green-600"
                >
                  News
                </Link>
              </li>
              <li>
                <Link
                  href="/matches"
                  className="text-gray-700 hover:text-green-600"
                >
                  Matches
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="text-gray-700 hover:text-green-600"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-700 hover:text-green-600"
                >
                  FAQ
                </Link>
              </li>
            </ul>
            <ul className="space-y-2 mt-4">
              <li>
                <Link
                  href="/programs"
                  className="text-gray-700 hover:text-green-600"
                >
                  Programs
                </Link>
              </li>
              <li>
                <Link
                  href="/amenities"
                  className="text-gray-700 hover:text-green-600"
                >
                  Amenities
                </Link>
              </li>
              <li>
                <Link
                  href="/blogs"
                  className="text-gray-700 hover:text-green-600"
                >
                  Blogs
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Connect with us</h3>
            <div className="flex space-x-4">
              <Link
                href="https://facebook.com"
                className="text-gray-700 hover:text-green-600"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </Link>
              <Link
                href="https://twitter.com"
                className="text-gray-700 hover:text-green-600"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733a4.67 4.67 0 002.048-2.578 9.3 9.3 0 01-2.958 1.13 4.66 4.66 0 00-7.938 4.25 13.229 13.229 0 01-9.602-4.868 4.66 4.66 0 001.442 6.22 4.647 4.647 0 01-2.11-.583v.06a4.66 4.66 0 003.737 4.568 4.692 4.692 0 01-2.104.08 4.661 4.661 0 004.352 3.234 9.348 9.348 0 01-5.786 1.995c-.376 0-.747-.022-1.112-.065a13.192 13.192 0 007.14 2.093c8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.4-.014-.598a9.47 9.47 0 002.323-2.417z" />
                </svg>
              </Link>
              <Link
                href="https://instagram.com"
                className="text-gray-700 hover:text-green-600"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.326 3.608 1.301.975.975 1.24 2.242 1.301 3.608.058 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.85c-.062 1.366-.326 2.633-1.301 3.608-.975.975-2.242 1.24-3.608 1.301-1.265.058-1.645.07-4.849.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.326-3.608-1.301-.975-.975-1.24-2.242-1.301-3.608-.058-1.265-.07-1.645-.07-4.849s.012-3.584.07-4.85c.062-1.366.326-2.633 1.301-3.608.975-.975 2.242-1.24 3.608-1.301 1.265-.058 1.645-.07 4.849-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-1.406.062-2.822.326-3.924 1.428-1.102 1.102-1.366 2.518-1.428 3.924-.058 1.28-.072 1.688-.072 4.947s.014 3.667.072 4.947c.062 1.406.326 2.822 1.428 3.924 1.102 1.102 2.518 1.366 3.924 1.428 1.28.058 1.688.072 4.947.072s3.667-.014 4.947-.072c1.406-.062 2.822-.326 3.924-1.428 1.102-1.102 1.366-2.518 1.428-3.924.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.062-1.406-.326-2.822-1.428-3.924-1.102-1.102-2.518-1.366-3.924-1.428-1.28-.058-1.688-.072-4.947-.072z" />
                  <path d="M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
                </svg>
              </Link>
              <Link
                href="https://youtube.com"
                className="text-gray-700 hover:text-green-600"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.498 6.186a2.984 2.984 0 00-2.1-2.102C19.744 3.5 12 3.5 12 3.5s-7.744 0-9.398.584a2.984 2.984 0 00-2.1 2.102C0 7.84 0 12 0 12s0 4.16.502 5.814a2.984 2.984 0 002.1 2.102C4.256 20.5 12 20.5 12 20.5s7.744 0 9.398-.584a2.984 2.984 0 002.1-2.102C24 16.16 24 12 24 12s0-4.16-.502-5.814zM9.6 15.6V8.4l6.4 3.6-6.4 3.6z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
