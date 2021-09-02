let px = n => `${Js.Int.toString(n)}px`

module RegionInputs = {
  let scaleInt = (value, scale) => Belt.Float.toInt(Belt.Int.toFloat(value) *. scale)

  let scaleRegion = ((x, y, w, h), actualWidth) => {
    let scale = Js.Int.toFloat(actualWidth) /. Js.Int.toFloat(PageSize.A4.px.width)
    (scaleInt(x, scale), scaleInt(y, scale), scaleInt(w, scale), scaleInt(h, scale))
  }

  @react.component
  let make = (
    ~model: Builder.Model.t,
    ~currentPageId: string,
    ~containerWidth: int,
    ~onClick: (unit => unit) => unit,
  ) => {
    let regions = model.inputs->Js.Array2.reduce((acc, input) => {
      switch input {
      | RegionInput(pageId, region, callback) =>
        if pageId === currentPageId {
          Js.Array2.concat(acc, [(region, callback)])
        } else {
          acc
        }
      | _ => acc
      }
    }, [])

    if Js.Array2.length(regions) > 0 {
      <div>
        {regions
        ->Js.Array2.mapi(((region, callback), i) => {
          let (x, y, w, h) = scaleRegion(region, containerWidth)
          let style = ReactDOM.Style.make(~top=px(y), ~left=px(x), ~width=px(w), ~height=px(h), ())
          <div
            key={Js.Int.toString(i)}
            className="absolute border-4 border-transparent hover:border-blue-500"
            style={style}
            onClick={_ => onClick(callback)}
          />
        })
        ->React.array}
      </div>
    } else {
      React.null
    }
  }
}

module SaveAsImageButton = {
  @react.component
  let make = (
    ~dataUrl: string,
    ~download: string,
    ~color: Buttons.buttonColor=#Gray,
    ~size: Buttons.buttonSize=#Base,
    ~full: bool=false,
    ~title: string="",
    ~children: React.element,
  ) => {
    // Setting the `href` to a `data:` value triggers the download.
    // The `download` attribute is used as the filename.
    let (href, setHref) = React.useState(_ => "#")
    let onClick = _ => setHref(_ => dataUrl)
    let className = ButtonStyles.makeClassName(~state=#Ready, ~color, ~size, ~full)
    <a href={href} title className={className} onClick={onClick} download={download}>
      {Buttons.getContent(#Ready, children)}
    </a>
  }
}

module PrintImageButton = {
  @react.component
  let make = (
    ~dataUrl: string,
    ~color: Buttons.buttonColor=#Gray,
    ~size: Buttons.buttonSize=#Base,
    ~full: bool=false,
    ~title: string="",
    ~children: React.element,
  ) => {
    let onClick = event => {
      open Dom2

      ReactEvent.Synthetic.preventDefault(event)
      // https://htmldom.dev/print-an-image/
      let docBodyEl = Document.document->Document.body->Body.asElement

      let iframe = Document.document->Document.createIframeElement
      let iframeEl = iframe->Iframe.asElement

      let iframeStyle = iframeEl->Element.style
      iframeStyle->Style.height(0)
      iframeStyle->Style.width(0)
      iframeStyle->Style.visibility(#hidden)

      iframe->Iframe.setSrcDocAttribute("<html><body style=\"margin:0;padding:0\"></body></html>")

      docBodyEl->Element.appendChild(iframeEl)

      iframeEl->Element.addEventListener("afterprint", _ => {
        iframe->Iframe.parentNode->Element.removeChild(iframeEl)
      })

      iframeEl->Element.addEventListener("load", _ => {
        let image = Image.make()
        let onLoad = () => {
          // onLoad is called twice for some reason, so clear it here
          image->Image.onLoadOption(None)
          let imageEl = image->Image.asElement
          let bodyEl = iframe->Iframe.contentDocument->Document.body->Body.asElement
          bodyEl->Element.style->Style.textAlign(#center)
          bodyEl->Element.appendChild(imageEl)
          iframe->Iframe.contentWindow->Window.print
        }
        image->Image.onLoadOption(Some(onLoad))
        image->Image.src(dataUrl)
      })
    }
    let className = ButtonStyles.makeClassName(~state=#Ready, ~color, ~size, ~full)
    <a href="#" title className={className} onClick={onClick}>
      {Buttons.getContent(#Ready, children)}
    </a>
  }
}

let useElementWidthListener = (elRef: React.ref<Js.Nullable.t<Dom2.Element.t>>) => {
  let (width, setWidth) = React.useState(() => None)

  React.useEffect0(() => {
    let updateWidth = () => {
      switch elRef.current->Js.Nullable.toOption {
      | None => ()
      | Some(el) => {
          let width = el->Dom2.Element.width
          setWidth(_ => Some(width))
        }
      }
    }

    let onResize = _ => {
      updateWidth()
    }

    Dom2.Window.instance->Dom2.Window.asElement->Dom2.Element.addEventListener("resize", onResize)

    updateWidth()

    Some(
      () => {
        Dom2.Window.instance
        ->Dom2.Window.asElement
        ->Dom2.Element.removeEventListener("resize", onResize)
      },
    )
  })

  width
}

@react.component
let make = (
  ~generatorDef: Builder.generatorDef,
  ~model: Builder.Model.t,
  ~onChange: unit => unit,
) => {
  let containerElRef: React.ref<Js.Nullable.t<Dom2.Element.t>> = React.useRef(Js.Nullable.null)
  let containerWidth = useElementWidthListener(containerElRef)

  let onSavePDF = _ => {
    let doc = JsPdf.make({
      orientation: #portrait,
      unit: #mm,
      format: #a4,
    })
    model.pages->Js.Array2.forEachi((page, index) => {
      let dataUrl = Dom2.Canvas.toDataUrlAsPng(page.canvas)
      if index > 0 {
        JsPdf.addPage(doc, #a4, #portrait)
      }
      doc->JsPdf.addImage(dataUrl, #PNG, 0, 0, PageSize.A4.mm.width, PageSize.A4.mm.height)
    })
    doc->JsPdf.save(generatorDef.name)
  }

  let showPageIds = Js.Array2.length(model.pages) > 1

  <div>
    {model.pages
    ->Js.Array2.mapi((page, index) => {
      let dataUrl = Dom2.Canvas.toDataUrlAsPng(page.canvas)

      let fileName =
        Belt.Array.length(model.pages) > 1
          ? generatorDef.name ++ " - " ++ page.id
          : generatorDef.name

      <div key={page.id}>
        {showPageIds
          ? <h1 className="font-bold text-2xl mb-4"> {React.string(page.id)} </h1>
          : React.null}
        <div
          className="mb-4 flex justify-between items-center"
          style={ReactDOM.Style.make(~maxWidth={px(PageSize.A4.px.width)}, ())}>
          <div>
            {index == 0
              ? <Buttons.Button state=#Ready size=#Small color=#Green onClick={onSavePDF}>
                  {React.string("Save as PDF")}
                </Buttons.Button>
              : React.null}
          </div>
          <div>
            <span className="mr-4">
              <SaveAsImageButton size=#Small color=#Blue dataUrl={dataUrl} download={fileName}>
                {React.string("Save as PNG")}
              </SaveAsImageButton>
            </span>
            <PrintImageButton size=#Small color=#Blue dataUrl={dataUrl}>
              {React.string("Print")}
            </PrintImageButton>
          </div>
        </div>
        // Important: The following div uses absolute positioning for the regions.
        <div
          className="relative"
          style={ReactDOM.Style.make(~maxWidth={px(PageSize.A4.px.width)}, ())}>
          <img
            ref={ReactDOM.Ref.domRef(containerElRef)}
            className="border shadow-xl mb-8"
            style={ReactDOM.Style.make()->ReactDOM.Style.unsafeAddStyle({
              "imageRendering": "pixelated",
            })}
            src={dataUrl}
          />
          {switch containerWidth {
          | None => React.null
          | Some(containerWidth) =>
            <RegionInputs
              containerWidth={containerWidth}
              model={model}
              currentPageId={page.id}
              onClick={callback => {
                callback()
                onChange()
              }}
            />
          }}
        </div>
      </div>
    })
    ->React.array}
  </div>
}
