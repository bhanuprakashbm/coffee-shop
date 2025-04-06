import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faUser, faComment, faArrowRight, faTimes } from '@fortawesome/free-solid-svg-icons';
import './PageStyles.css';

const BlogPage = () => {
    const [expandedPost, setExpandedPost] = useState(null);

    // Example blog data - in a real application, this would likely come from an API
    const blogPosts = [
        {
            id: 1,
            title: 'The Art of Coffee Brewing',
            date: 'April 12, 2023',
            author: 'Sarah Johnson',
            excerpt: 'Discover the secrets to brewing the perfect cup of coffee at home with these expert tips and techniques.',
            image: 'https://images.pexels.com/photos/585750/pexels-photo-585750.jpeg?auto=compress&cs=tinysrgb&w=1280',
            content: `Coffee brewing is both an art and a science. The perfect cup requires attention to detail and an understanding of how different variables affect the final taste.

First, let's talk about water quality. Water makes up more than 98% of your coffee, so using filtered water can make a noticeable difference. The ideal water temperature for brewing is between 195°F and 205°F (90°C to 96°C). Water that's too hot will extract bitter compounds, while water that's too cool will result in under-extraction.

Coffee-to-water ratio is another crucial factor. As a general rule, a ratio of 1:16 (one part coffee to 16 parts water) works well for most brewing methods. This is approximately 1 tablespoon of ground coffee per 8 ounces of water, but using a scale for measurement will give you more consistent results.

The grind size can dramatically affect extraction. Espresso requires a fine grind, while French press needs a coarse grind. A medium grind works well for drip coffee makers. The fresher the grind, the better your coffee will taste, so consider investing in a quality burr grinder.

For pour-over methods, the pouring technique matters. Start with a 30-second bloom (pre-infusion) where you add just enough water to saturate the grounds. This allows carbon dioxide to escape and prepares the coffee for optimal extraction. Then pour in slow, steady spirals from the center outward.

Finally, don't overlook the importance of fresh beans. Coffee reaches its peak flavor within days of roasting and begins to lose quality after about two weeks. Store your beans in an airtight container away from light, heat, and moisture.

With these fundamentals in mind, you'll be well on your way to brewing café-quality coffee in your own kitchen. Experiment with different beans and brewing methods to discover your perfect cup.`
        },
        {
            id: 2,
            title: 'Coffee Origin Stories: Ethiopian Yirgacheffe',
            date: 'March 28, 2023',
            author: 'Michael Chen',
            excerpt: 'Explore the rich history and unique characteristics of one of the world\'s most celebrated coffee varieties.',
            image: 'https://images.pexels.com/photos/942818/pexels-photo-942818.jpeg?auto=compress&cs=tinysrgb&w=1280',
            content: `Ethiopian Yirgacheffe is often described as the crown jewel of coffees, and its story is as rich as its flavor. Legend has it that coffee was first discovered in Ethiopia when a goat herder named Kaldi noticed his goats becoming unusually energetic after eating berries from a certain tree. Curious, Kaldi tried the berries himself and experienced a similar energizing effect. He brought the berries to a local monastery, where monks created a drink that helped them stay alert during long hours of prayer.

Today, the Yirgacheffe region in southern Ethiopia remains one of the most respected coffee-growing areas in the world. Located in the highlands at elevations between 1,700 and 2,200 meters above sea level, this area provides ideal conditions for growing exceptional coffee. The combination of high altitude, rich soil, ample rainfall, and optimal temperature creates the perfect environment for slow-maturing coffee cherries, allowing complex flavors to develop.

Yirgacheffe coffees are primarily grown by small-scale farmers who use traditional methods passed down through generations. Many farms are certified organic by default simply because chemical fertilizers and pesticides have never been introduced to the area. The typical farm size is less than two hectares, with each farmer carefully tending to their coffee trees alongside other crops.

What makes Yirgacheffe truly special is its distinctive taste profile. These coffees are known for their bright acidity, medium body, and complex flavor notes that often include floral aromatics (jasmine, bergamot), citrus (lemon, lime), and stone fruits (peach, apricot). When wet-processed (washed), Yirgacheffe displays remarkable clarity and elegance. Natural (dry-processed) Yirgacheffe offers intensely fruity, wine-like characteristics with pronounced blueberry notes.

Coffee from this region undergoes a rigorous sorting process. After harvesting, the coffee cherries are typically processed at local washing stations, where they're sorted by density and quality. The beans are then fermented, washed, and dried on raised beds, allowing for consistent air circulation.

As you sip a cup of Yirgacheffe, you're not just enjoying a delicious beverage – you're participating in a tradition that spans centuries and connects you to the birthplace of coffee itself. The next time you brew Ethiopian Yirgacheffe, take a moment to appreciate the journey these beans have made from the highlands of Ethiopia to your cup.`
        },
        {
            id: 3,
            title: 'Latte Art: From Basic to Advanced',
            date: 'March 15, 2023',
            author: 'Emma Rodriguez',
            excerpt: 'Learn how to create stunning latte art designs that will impress your friends and elevate your coffee experience.',
            image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=1280',
            content: `Latte art transforms an ordinary espresso drink into a visual masterpiece. While it might seem intimidating at first, creating beautiful designs in your coffee is achievable with practice and the right technique.

The foundation of latte art begins with two key elements: properly extracted espresso and correctly textured milk. For the espresso, you'll want a rich shot with good crema – that golden-brown layer on top. The crema provides the canvas for your art.

Milk texturing is perhaps the most crucial skill to master. The goal is to create "microfoam," where the milk has a glossy appearance with tiny bubbles that are barely visible. To achieve this, position your steam wand just below the surface of the milk. You should hear a gentle hissing sound, not loud screeching. The milk should spin in a whirlpool motion, incorporating air until it reaches approximately 30-35°C (86-95°F). Then submerge the wand slightly deeper to continue heating without adding more air, until it reaches about 65°C (150°F).

When properly textured, the milk should have a paint-like consistency and a shiny surface. Tap the pitcher on the counter to pop any large bubbles, then swirl to incorporate the foam and milk together. This prevents the foam from separating, which would make pouring designs impossible.

For beginners, the heart is the simplest design to start with:
1. Pour the milk from a height of about 3-4 inches to allow it to sink below the crema.
2. When the cup is about half full, bring the pitcher closer to the surface and increase the flow rate.
3. As the cup fills, move the pitcher forward through the crema to create the heart shape.
4. Finish with a quick strike-through motion to create the point of the heart.

Once you've mastered the heart, the rosetta (fern-like pattern) is a natural progression:
1. Start the same way as the heart, pouring from a height.
2. When the cup is about half full, bring the pitcher close to the surface.
3. Begin a gentle side-to-side wiggling motion while slowly moving backward toward the opposite side of the cup.
4. Finish with a straight line through the middle to create the stem.

For advanced designs like the tulip:
1. Pour as you would for a heart, but stop the pour briefly to create a single white circle.
2. Move the pitcher slightly back and pour again, creating a second circle that pushes the first one forward.
3. Repeat this stop-start technique to create multiple layers.
4. Finish with a straight pour through the center to connect all layers.

Remember that latte art requires patience and practice. Even professional baristas spend months perfecting their technique. The temperature, pouring height, angle, and speed all affect the final result. But with persistence, you'll be creating Instagram-worthy designs in no time.`
        },
        {
            id: 4,
            title: 'Sustainable Coffee: Making Ethical Choices',
            date: 'February 22, 2023',
            author: 'David Wilson',
            excerpt: 'Understanding the impact of your coffee choices and how to support sustainable and ethical coffee production.',
            image: 'https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=1280',
            content: `Coffee is one of the world's most traded commodities, with millions of people depending on it for their livelihood. Unfortunately, conventional coffee production often comes with significant environmental and social costs. As consumers, our purchasing decisions can either perpetuate these problems or help create positive change.

The environmental impact of coffee production can be substantial. Traditional sun-grown coffee requires clearing forests, leading to habitat destruction and biodiversity loss. These monoculture farms also typically rely heavily on chemical fertilizers and pesticides, which can contaminate local water sources and soil. Additionally, coffee processing can generate significant waste and water pollution if not properly managed.

On the social side, coffee farmers are among the most vulnerable links in the supply chain. Many small-scale producers earn barely enough to cover their costs, let alone support their families. Child labor, unsafe working conditions, and lack of access to education and healthcare remain problems in many coffee-growing regions.

So how can you make more ethical coffee choices? Look for these certifications when purchasing:

1. Fair Trade: Ensures farmers receive fair prices for their crops and promotes safe working conditions and sustainable farming practices.

2. Rainforest Alliance: Focuses on protecting ecosystems and wildlife habitats while supporting the well-being of farm workers and communities.

3. Organic: Verifies that coffee is grown without synthetic pesticides or fertilizers, promoting soil health and reduced chemical exposure.

4. Bird Friendly: Developed by the Smithsonian Migratory Bird Center, this certification guarantees shade-grown coffee that preserves critical habitat for birds and other wildlife.

5. Direct Trade: Though not a formal certification, this model involves roasters purchasing directly from farmers, often at prices higher than Fair Trade minimums.

Beyond certifications, consider these practices to make your coffee habit more sustainable:

- Buy from local roasters who have direct relationships with farmers
- Choose shade-grown coffee whenever possible
- Use a reusable mug instead of disposable cups
- Compost your coffee grounds and filters
- Invest in a durable, long-lasting coffee maker rather than single-use pods

Remember that perfect sustainability is impossible, but making incremental improvements in your choices can collectively lead to significant positive change. By being mindful about where your coffee comes from and how it's produced, you can enjoy your daily cup knowing you're supporting a more ethical coffee industry.`
        },
        {
            id: 5,
            title: 'Cold Brew vs. Iced Coffee: What\'s the Difference?',
            date: 'February 10, 2023',
            author: 'Lisa Thompson',
            excerpt: 'A comprehensive comparison of cold brew and iced coffee - from brewing methods to flavor profiles.',
            image: 'https://images.pexels.com/photos/1727123/pexels-photo-1727123.jpeg?auto=compress&cs=tinysrgb&w=1280',
            content: `When summer temperatures soar, nothing satisfies quite like a refreshing cold coffee beverage. But there's often confusion between two popular options: cold brew and iced coffee. While they might look similar in your glass, they're fundamentally different drinks with distinct characteristics.

Iced coffee is exactly what it sounds like—coffee brewed hot, then cooled down. Typically, it's brewed at double strength (using twice the amount of coffee grounds) to compensate for the dilution that occurs when it's poured over ice. The brewing process is quick, usually taking just a few minutes, making it convenient for a fast caffeine fix. Because hot water extracts coffee compounds quickly, iced coffee often retains the full spectrum of flavors you'd find in a hot cup, including bright acidity and bitterness.

Cold brew, on the other hand, never meets hot water. It's made by steeping coffee grounds in cold or room-temperature water for an extended period—usually 12 to 24 hours. This slow extraction process draws out a different chemical profile from the beans. The result is a coffee concentrate that's typically diluted with water or milk before serving.

The key differences become apparent in the taste profile. Cold brew tends to be:
- Smoother and less acidic (up to 67% less acidic than hot-brewed coffee)
- Naturally sweeter, often with chocolate or nutty undertones
- Less bitter due to the absence of certain compounds that only extract at higher temperatures
- Higher in caffeine concentration (though this is often balanced out when diluted)

Iced coffee usually features:
- Brighter, more complex flavor notes
- Higher acidity that can cut through milk and sweeteners
- More pronounced bitterness
- Familiar coffee flavor similar to your regular hot cup

Each method has its advantages. Cold brew's smooth, low-acid profile makes it ideal for those with sensitive stomachs. Its concentrated form also has a longer shelf life, staying fresh in your refrigerator for up to two weeks. Iced coffee, meanwhile, highlights the unique characteristics of single-origin beans better and can be prepared in minutes rather than hours.

From a nutritional standpoint, cold brew may contain more caffeine by volume, but since it's typically diluted, the caffeine content often ends up comparable to iced coffee. Both can be customized with milk, sweeteners, or flavored syrups according to preference.

Ultimately, the choice between cold brew and iced coffee comes down to personal taste preference, time availability, and digestive sensitivity. Many coffee enthusiasts appreciate both for different occasions—cold brew for a smooth, easy-drinking experience, and iced coffee when they want those bright, complex notes to shine through.`
        },
        {
            id: 6,
            title: 'Coffee and Health: Separating Fact from Fiction',
            date: 'January 28, 2023',
            author: 'Dr. James Miller',
            excerpt: 'A scientific look at how coffee affects your body and mind, debunking common myths and highlighting proven benefits.',
            image: 'https://images.pexels.com/photos/1797161/pexels-photo-1797161.jpeg?auto=compress&cs=tinysrgb&w=1280',
            content: `Coffee is one of the most studied beverages in the scientific literature, with thousands of research papers examining its effects on human health. Despite this wealth of information, misconceptions about coffee's health impacts remain prevalent. Let's examine what the science actually tells us about this beloved brew.

First, the good news: moderate coffee consumption (defined as 3-5 cups per day) has been consistently associated with numerous health benefits. Multiple large-scale studies have found that regular coffee drinkers have a lower risk of developing type 2 diabetes, with each daily cup potentially reducing risk by 7%. Coffee consumption is also linked to reduced risks of Parkinson's disease, Alzheimer's disease, and certain liver conditions including cancer and cirrhosis.

The beverage's positive effects are largely attributed to its rich composition of bioactive compounds. Coffee contains more than 1,000 compounds, including chlorogenic acids, melanoidins, and various antioxidants that combat oxidative stress and inflammation. Contrary to common belief, caffeine isn't the only beneficial component—decaffeinated coffee shows many of the same protective effects.

Speaking of caffeine, this natural stimulant affects individuals differently based on genetic factors. Some people metabolize caffeine quickly and experience few adverse effects, while others process it slowly and may be more sensitive to its stimulatory properties. For most healthy adults, moderate caffeine intake (up to 400mg daily, or about 4 cups of coffee) is considered safe and may improve cognitive function, physical performance, and mood.

Now for some myth-busting:

Myth: Coffee causes dehydration.
Fact: While caffeine has mild diuretic properties, the water in coffee more than compensates for any increased urination. Moderate coffee consumption contributes to daily fluid intake rather than detracting from it.

Myth: Coffee stunts growth.
Fact: No scientific evidence supports this popular myth. Height is determined primarily by genetics and overall nutrition, not coffee consumption.

Myth: Evening coffee always disrupts sleep.
Fact: Caffeine's half-life (the time it takes for your body to eliminate half of it) averages 5-6 hours but varies significantly between individuals. Some people can drink coffee in the evening with no sleep issues, while others are more sensitive and should avoid it after midday.

Myth: Coffee causes heart disease.
Fact: Current research suggests moderate coffee consumption either has no effect on cardiovascular health or may actually be protective. However, unfiltered coffee (like French press or Turkish coffee) contains compounds called diterpenes that can raise cholesterol levels.

Certain populations should approach coffee with caution. Pregnant women are advised to limit caffeine intake to 200mg daily (about 2 cups). People with specific medical conditions like uncontrolled high blood pressure, sleep disorders, or certain anxiety disorders may need to limit or avoid coffee. As with many dietary factors, moderation and individual tolerance are key considerations.

In summary, for most people, moderate coffee consumption appears to be not just safe but potentially beneficial for long-term health. The scientific consensus has shifted dramatically from viewing coffee as a vice to recognizing it as a complex beverage with numerous positive health attributes when consumed responsibly.`
        }
    ];

    const handleReadMore = (id) => {
        setExpandedPost(id);
        window.scrollTo(0, 0);
    };

    const handleClosePost = () => {
        setExpandedPost(null);
    };

    // Render the expanded post view when a post is selected
    if (expandedPost) {
        const post = blogPosts.find(post => post.id === expandedPost);
        return (
            <div className="page-container blog-page">
                <div className="expanded-blog-post">
                    <button className="close-post-btn" onClick={handleClosePost}>
                        <FontAwesomeIcon icon={faTimes} /> Close
                    </button>
                    <div className="expanded-blog-image">
                        <img src={post.image} alt={post.title} />
                    </div>
                    <div className="expanded-blog-content">
                        <h1>{post.title}</h1>
                        <div className="blog-meta">
                            <span><FontAwesomeIcon icon={faCalendar} /> {post.date}</span>
                            <span><FontAwesomeIcon icon={faUser} /> By {post.author}</span>
                        </div>
                        <div className="blog-full-content">
                            {post.content.split('\n\n').map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="page-container blog-page">
            <div className="page-banner">
                <h1>Coffee Blog</h1>
                <p>Insights, stories, and expertise from the world of coffee.</p>
            </div>

            <div className="blog-container">
                {blogPosts.map(post => (
                    <div key={post.id} className="blog-post">
                        <div className="blog-image">
                            <img src={post.image} alt={post.title} />
                        </div>
                        <div className="blog-content">
                            <h2>{post.title}</h2>
                            <div className="blog-meta">
                                <span><FontAwesomeIcon icon={faCalendar} /> {post.date}</span>
                                <span><FontAwesomeIcon icon={faUser} /> By {post.author}</span>
                            </div>
                            <p>{post.excerpt}</p>
                            <button className="blog-btn" onClick={() => handleReadMore(post.id)}>
                                <span>Read More <FontAwesomeIcon icon={faArrowRight} /></span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogPage; 