<h3>ink-droppable</h3>

<p>You can have elements which can be dragged around by your user.</p>

<h4>Usage</h4>

<pre class="prettyprint lang-html">
  <div id="drop-constraint" class="large-100">
    <div class="column-group">
      <div class="drop-container large-45" ink-droppable drop-accept=".drop-pressed">
        <img src="img/pressed-4.png"
             ink-draggable
             drag-constraint="#drop-constraint"
             class="drop-pressed" />
      </div>
      <div class="large-5"></div>
      <div class="drop-container large-45" ink-droppable drop-accept=".drop-pressed">
      </div>
    </div>
  </div>
</pre>

<h4>Example</h4>

<div id="drop-constraint">
  <div class="column-group">
    <div class="drop-container large-45" ink-droppable drop-accept=".drop-pressed">
      <img src="img/pressed-4.png" ink-draggable drag-constraint="#drop-constraint" class="drop-pressed" />
    </div>
    <div class="large-5"></div>
    <div class="drop-container large-45" ink-droppable drop-accept=".drop-pressed">
    </div>
  </div>
</div>
