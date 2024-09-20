import style from './quoteblock.module.scss';

export function QuoteBlock(){

    return <div className="container p-4">
        <figure>
            <blockquote className={"blockquote " + style.quoteText }>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum at saepe assumenda minus, ullam voluptate! Similique dolore consequuntur alias eaque, ea quam praesentium officia facere dolor sapiente.</p>
            </blockquote>
            <figcaption className="blockquote-footer">
                Lorem, ipsum. <cite>XYZ</cite>
            </figcaption>
        </figure>
    </div>
}